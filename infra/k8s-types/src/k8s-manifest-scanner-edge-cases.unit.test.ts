import { describe, expect, test } from "bun:test"
import { requireFirst } from "@shared/utils-narrow/require-first"
import { HOSTNAME_KEY } from "./hostnames"
import { scanManifestText } from "./k8s-manifest-scanner"

describe("scanManifestText — edge cases", () => {
  test("file with no docs → empty docs array, no errors", () => {
    const { docs, errors } = scanManifestText("")
    expect(docs).toEqual([])
    expect(errors).toEqual([])
  })

  test("file with only comments and blanks → no docs", () => {
    const text = `# just a comment

# another


`
    const { docs, errors } = scanManifestText(text)
    expect(docs).toEqual([])
    expect(errors).toEqual([])
  })

  test("doc with no kind → kind is undefined, hasPodTemplate is false", () => {
    const text = `apiVersion: v1
metadata:
  name: anon
`
    const { docs } = scanManifestText(text)
    expect(requireFirst(docs).kind).toBeUndefined()
    expect(requireFirst(docs).hasPodTemplate).toBe(false)
    expect(requireFirst(docs).nodeSelectorKeys).toEqual([])
  })

  test("duplicate top-level key → error pushed, first wins, parsing continues", () => {
    const text = `apiVersion: v1
kind: ConfigMap
kind: Secret
metadata:
  name: c
`
    const { docs, errors } = scanManifestText(text)
    expect(docs).toHaveLength(1)
    expect(requireFirst(docs).kind).toBe("ConfigMap")
    expect(errors).toHaveLength(1)
    expect(requireFirst(errors).message).toContain("duplicate top-level key")
    expect(requireFirst(errors).message).toContain("kind")
    expect(requireFirst(errors).line).toBe(3)
  })

  test("duplicate nodeSelector key → error pushed, first value wins, no crash", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-01
        kubernetes.io/hostname: node-02
`
    const { docs, errors } = scanManifestText(text)
    expect(docs).toHaveLength(1)
    expect(requireFirst(docs).hostnameSelector).toBe("node-01")
    expect(requireFirst(docs).nodeSelectorKeys).toEqual([HOSTNAME_KEY])
    expect(errors).toHaveLength(1)
    expect(requireFirst(errors).message).toContain("duplicate nodeSelector key")
  })

  test("malformed indentation under nodeSelector → error pushed, doesn't crash", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-01
          unexpected: nested
`
    const { docs, errors } = scanManifestText(text)
    expect(docs).toHaveLength(1)
    expect(requireFirst(docs).hostnameSelector).toBe("node-01")
    expect(errors.some((e) => e.message.includes("unexpected nested block"))).toBe(true)
  })

  test("Deployment without metadata → name and namespace are undefined", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: app
          image: app:latest
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(requireFirst(docs).name).toBeUndefined()
    expect(requireFirst(docs).namespace).toBeUndefined()
  })

  test("Job nodeSelector under spec.template.spec is captured", () => {
    const text = `apiVersion: batch/v1
kind: Job
metadata:
  name: oneshot
  namespace: jobs
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-02
      containers:
        - name: oneshot
          image: ci:latest
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(requireFirst(docs).kind).toBe("Job")
    expect(requireFirst(docs).hostnameSelector).toBe("node-02")
  })
})
