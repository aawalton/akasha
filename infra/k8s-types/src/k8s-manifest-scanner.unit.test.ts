import { describe, expect, test } from "bun:test"
import { HOSTNAME_KEY } from "./hostnames"
import {
  HOSTNAME_SELECTOR_KEY,
  PIN_REQUIRED_KINDS,
  POD_TEMPLATE_KINDS,
  scanManifestText,
} from "./k8s-manifest-scanner"

function at<T>(arr: readonly T[], i: number): T {
  const v = arr[i]
  if (v === undefined) throw new Error(`expected element at index ${i}, got undefined`)
  return v
}

describe("constants", () => {
  test("POD_TEMPLATE_KINDS contains the five workload kinds", () => {
    expect(POD_TEMPLATE_KINDS.has("Deployment")).toBe(true)
    expect(POD_TEMPLATE_KINDS.has("StatefulSet")).toBe(true)
    expect(POD_TEMPLATE_KINDS.has("DaemonSet")).toBe(true)
    expect(POD_TEMPLATE_KINDS.has("Job")).toBe(true)
    expect(POD_TEMPLATE_KINDS.has("CronJob")).toBe(true)
    expect(POD_TEMPLATE_KINDS.size).toBe(5)
  })

  test("PIN_REQUIRED_KINDS is POD_TEMPLATE_KINDS minus DaemonSet", () => {
    expect(PIN_REQUIRED_KINDS.has("DaemonSet")).toBe(false)
    expect(PIN_REQUIRED_KINDS.has("Deployment")).toBe(true)
    expect(PIN_REQUIRED_KINDS.has("StatefulSet")).toBe(true)
    expect(PIN_REQUIRED_KINDS.has("Job")).toBe(true)
    expect(PIN_REQUIRED_KINDS.has("CronJob")).toBe(true)
    expect(PIN_REQUIRED_KINDS.size).toBe(4)
  })

  test("HOSTNAME_SELECTOR_KEY re-exports the canonical HOSTNAME_KEY", () => {
    expect(HOSTNAME_SELECTOR_KEY).toBe(HOSTNAME_KEY)
  })
})

describe("scanManifestText — single doc", () => {
  test("Deployment with hostname pinning extracts kind/name/namespace and hostnameSelector", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloudflared
  namespace: cloudflared
spec:
  replicas: 2
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-04
      containers:
        - name: cloudflared
          image: cloudflare/cloudflared:2026.3.0
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(1)
    const doc = at(docs, 0)
    expect(doc.apiVersion).toBe("apps/v1")
    expect(doc.kind).toBe("Deployment")
    expect(doc.name).toBe("cloudflared")
    expect(doc.namespace).toBe("cloudflared")
    expect(doc.hasPodTemplate).toBe(true)
    expect(doc.nodeSelectorKeys).toEqual([HOSTNAME_KEY])
    expect(doc.hostnameSelector).toBe("node-04")
    expect(doc.hasPodAffinity).toBe(false)
    expect(doc.startLine).toBe(1)
  })

  test("StatefulSet with no nodeSelector → empty keys, hostnameSelector undefined", () => {
    const text = `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: postgres
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: postgres
          image: postgres:18
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(1)
    expect(at(docs, 0).kind).toBe("StatefulSet")
    expect(at(docs, 0).nodeSelectorKeys).toEqual([])
    expect(at(docs, 0).hostnameSelector).toBeUndefined()
    expect(at(docs, 0).hasPodTemplate).toBe(true)
  })

  test("DaemonSet has hasPodTemplate=true but PIN_REQUIRED_KINDS excludes it", () => {
    const text = `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
  namespace: prometheus
spec:
  template:
    spec:
      containers:
        - name: node-exporter
          image: prom/node-exporter:latest
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(1)
    expect(at(docs, 0).kind).toBe("DaemonSet")
    expect(at(docs, 0).hasPodTemplate).toBe(true)
    expect(PIN_REQUIRED_KINDS.has(at(docs, 0).kind ?? "")).toBe(false)
  })

  test("CronJob with deeply-nested nodeSelector → captured under jobTemplate.spec.template.spec", () => {
    const text = `apiVersion: batch/v1
kind: CronJob
metadata:
  name: ddns
  namespace: cloudflared
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          nodeSelector:
            kubernetes.io/hostname: node-01
          containers:
            - name: ddns
              image: ci:latest
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(1)
    expect(at(docs, 0).kind).toBe("CronJob")
    expect(at(docs, 0).nodeSelectorKeys).toEqual([HOSTNAME_KEY])
    expect(at(docs, 0).hostnameSelector).toBe("node-01")
    expect(at(docs, 0).hasPodTemplate).toBe(true)
  })

  test("nodeSelector with two keys → both captured in declaration order", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: ns
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/os: linux
        kubernetes.io/hostname: node-01
      containers:
        - name: app
          image: app:latest
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(at(docs, 0).nodeSelectorKeys).toEqual(["kubernetes.io/os", HOSTNAME_KEY])
    expect(at(docs, 0).hostnameSelector).toBe("node-01")
  })

  test("comments before/inside the nodeSelector block don't break parsing", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
# top-level comment
metadata:
  name: app
  # comment inside metadata
  namespace: ns
spec:
  template:
    spec:
      # comment before nodeSelector
      nodeSelector:
        # comment inside nodeSelector
        kubernetes.io/hostname: node-04 # trailing comment
        # another comment between keys
        kubernetes.io/os: linux
      containers:
        - name: app
          image: app:latest
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(at(docs, 0).name).toBe("app")
    expect(at(docs, 0).namespace).toBe("ns")
    expect(at(docs, 0).nodeSelectorKeys).toEqual([HOSTNAME_KEY, "kubernetes.io/os"])
    expect(at(docs, 0).hostnameSelector).toBe("node-04")
  })

  test("quoted hostname value is unquoted", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: "node-02"
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).hostnameSelector).toBe("node-02")
  })

  test("bare Pod resolves nodeSelector under spec.nodeSelector", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: debug
  namespace: default
spec:
  nodeSelector:
    kubernetes.io/hostname: node-03
  containers:
    - name: debug
      image: busybox
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(at(docs, 0).kind).toBe("Pod")
    expect(at(docs, 0).hostnameSelector).toBe("node-03")
    expect(at(docs, 0).hasPodTemplate).toBe(false)
  })

  test("Service has hasPodTemplate=false and empty nodeSelectorKeys", () => {
    const text = `apiVersion: v1
kind: Service
metadata:
  name: app
  namespace: ns
spec:
  selector:
    app: app
  ports:
    - port: 80
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(at(docs, 0).kind).toBe("Service")
    expect(at(docs, 0).hasPodTemplate).toBe(false)
    expect(at(docs, 0).nodeSelectorKeys).toEqual([])
    expect(at(docs, 0).hostnameSelector).toBeUndefined()
  })
})
