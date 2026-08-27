import { describe, expect, test } from "bun:test"
import { scanManifestText } from "./k8s-manifest-scanner"

function at<T>(arr: readonly T[], i: number): T {
  const v = arr[i]
  if (v === undefined) throw new Error(`expected element at index ${i}, got undefined`)
  return v
}

describe("scanManifestText — imageLines", () => {
  test("single container image is captured with line number and quotes stripped", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      containers:
        - name: app
          image: "app:1.2.3"
`
    const { docs } = scanManifestText(text)
    expect(docs).toHaveLength(1)
    expect(at(docs, 0).imageLines).toEqual([{ value: "app:1.2.3", line: 10 }])
  })

  test("an image spelled as the container entry's own head line is captured", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgbouncer
spec:
  template:
    spec:
      containers:
        - image: edoburu/pgbouncer:v1.25.1-p0
          name: pgbouncer
          imagePullPolicy: IfNotPresent
`
    const { docs } = scanManifestText(text)
    expect(docs).toHaveLength(1)
    expect(at(docs, 0).imageLines).toEqual([{ value: "edoburu/pgbouncer:v1.25.1-p0", line: 9 }])
  })

  test("init containers and main containers both emit images, in document order", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      initContainers:
        - name: init
          image: busybox:1.36
      containers:
        - name: app
          image: app:1.2.3
        - name: sidecar
          image: sidecar:0.9
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).imageLines).toEqual([
      { value: "busybox:1.36", line: 10 },
      { value: "app:1.2.3", line: 13 },
      { value: "sidecar:0.9", line: 15 },
    ])
  })

  test("single-quoted image value is unquoted", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: c
      image: 'foo:bar'
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).imageLines).toEqual([{ value: "foo:bar", line: 8 }])
  })

  test("trailing comments after image value are stripped", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: c
      image: foo:bar  # pinned
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).imageLines).toEqual([{ value: "foo:bar", line: 8 }])
  })

  test("doc with no images yields empty imageLines", () => {
    const text = `apiVersion: v1
kind: ConfigMap
metadata:
  name: c
data:
  key: value
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).imageLines).toEqual([])
  })

  test("multi-doc file emits images per-doc, never crossing the `---` boundary", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: a
spec:
  containers:
    - name: c
      image: a:1
---
apiVersion: v1
kind: Pod
metadata:
  name: b
spec:
  containers:
    - name: c
      image: b:1
`
    const { docs } = scanManifestText(text)
    expect(docs).toHaveLength(2)
    expect(at(docs, 0).imageLines).toEqual([{ value: "a:1", line: 8 }])
    expect(at(docs, 1).imageLines).toEqual([{ value: "b:1", line: 17 }])
  })

  test("CRD-nested image (deeply indented, not under containers) is still captured", () => {
    const text = `apiVersion: example.com/v1
kind: CustomThing
metadata:
  name: x
spec:
  jobTemplate:
    pod:
      runner:
        image: runner:latest
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).imageLines).toEqual([{ value: "runner:latest", line: 9 }])
  })

  test("non-image keys ending in `image` (e.g. `imagePullPolicy`) are not captured", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: c
      image: foo:1
      imagePullPolicy: IfNotPresent
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).imageLines).toEqual([{ value: "foo:1", line: 8 }])
  })
})

describe("scanManifestText — containerResources", () => {
  test("single container with matching request and limit emits one probe", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      containers:
        - name: app
          image: app:1
          resources:
            requests:
              memory: "256Mi"
            limits:
              memory: "256Mi"
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).containerResources).toHaveLength(1)
    const probe = at(at(docs, 0).containerResources, 0)
    expect(probe.containerName).toBe("app")
    expect(probe.requestMemory?.value).toBe("256Mi")
    expect(probe.requestMemory?.line).toBe(13)
    expect(probe.limitMemory?.value).toBe("256Mi")
    expect(probe.limitMemory?.line).toBe(15)
  })

  test("two containers each emit their own probe with independent request/limit", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: a
      image: a:1
      resources:
        requests:
          memory: 100Mi
        limits:
          memory: 100Mi
    - name: b
      image: b:1
      resources:
        requests:
          memory: 200Mi
        limits:
          memory: 256Mi
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).containerResources).toHaveLength(2)
    const [a, b] = at(docs, 0).containerResources
    if (a === undefined || b === undefined) throw new Error("expected two probes")
    expect(a.containerName).toBe("a")
    expect(a.requestMemory?.value).toBe("100Mi")
    expect(a.limitMemory?.value).toBe("100Mi")
    expect(b.containerName).toBe("b")
    expect(b.requestMemory?.value).toBe("200Mi")
    expect(b.limitMemory?.value).toBe("256Mi")
  })

  test("resources block with only requests (no limits) emits probe with limit undefined", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: a
      image: a:1
      resources:
        requests:
          memory: 100Mi
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).containerResources).toHaveLength(1)
    const probe = at(at(docs, 0).containerResources, 0)
    expect(probe.requestMemory?.value).toBe("100Mi")
    expect(probe.limitMemory).toBeUndefined()
  })

  test("memory values strip surrounding quotes (single and double)", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: a
      image: a:1
      resources:
        requests:
          memory: "256Mi"
        limits:
          memory: '256Mi'
`
    const { docs } = scanManifestText(text)
    const probe = at(at(docs, 0).containerResources, 0)
    expect(probe.requestMemory?.value).toBe("256Mi")
    expect(probe.limitMemory?.value).toBe("256Mi")
  })

  test("doc with no resources block yields empty containerResources", () => {
    const text = `apiVersion: v1
kind: ConfigMap
metadata:
  name: c
data:
  key: value
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).containerResources).toEqual([])
  })

  test("CronJob (deeply nested) container resources are captured", () => {
    const text = `apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup
spec:
  schedule: "0 0 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: backup
              image: backup:1
              resources:
                requests:
                  memory: 64Mi
                limits:
                  memory: 64Mi
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).containerResources).toHaveLength(1)
    expect(at(at(docs, 0).containerResources, 0).containerName).toBe("backup")
    expect(at(at(docs, 0).containerResources, 0).requestMemory?.value).toBe("64Mi")
  })

  test("init containers also emit probes", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      initContainers:
        - name: init
          image: init:1
          resources:
            requests:
              memory: 32Mi
            limits:
              memory: 32Mi
      containers:
        - name: app
          image: app:1
          resources:
            requests:
              memory: 100Mi
            limits:
              memory: 100Mi
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).containerResources).toHaveLength(2)
    expect(at(docs, 0).containerResources.map((c) => c.containerName)).toEqual(["init", "app"])
  })

  test("comment between requests and limits memory entries doesn't break probe", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: a
      image: a:1
      resources:
        requests:
          # explanatory comment
          memory: 100Mi
        # outer comment
        limits:
          memory: 100Mi
`
    const { docs } = scanManifestText(text)
    expect(at(at(docs, 0).containerResources, 0).requestMemory?.value).toBe("100Mi")
    expect(at(at(docs, 0).containerResources, 0).limitMemory?.value).toBe("100Mi")
  })

  test("mismatched request and limit are surfaced via the probe (caller's rule)", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: a
      image: a:1
      resources:
        requests:
          memory: 100Mi
        limits:
          memory: 200Mi
`
    const { docs } = scanManifestText(text)
    const probe = at(at(docs, 0).containerResources, 0)
    expect(probe.requestMemory?.value).toBe("100Mi")
    expect(probe.limitMemory?.value).toBe("200Mi")
    expect(probe.requestMemory?.value).not.toBe(probe.limitMemory?.value)
  })
})
