import { describe, expect, test } from "bun:test"
import { WORKLOAD_CLASS_KEY } from "./hostnames"
import { scanManifestText } from "./k8s-manifest-scanner"

function at<T>(arr: readonly T[], i: number): T {
  const v = arr[i]
  if (v === undefined) throw new Error(`expected element at index ${i}, got undefined`)
  return v
}

describe("scanManifestText — multi-doc", () => {
  test("Deployment + Service + ConfigMap separated by `---` → 3 docs, only Deployment has pod template", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: ns
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-04
      containers:
        - name: app
          image: app:latest
---
apiVersion: v1
kind: Service
metadata:
  name: app
  namespace: ns
spec:
  ports:
    - port: 80
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: ns
data:
  key: value
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(3)
    expect(docs.map((d) => d.kind)).toEqual(["Deployment", "Service", "ConfigMap"])
    expect(docs.map((d) => d.hasPodTemplate)).toEqual([true, false, false])
    expect(at(docs, 0).hostnameSelector).toBe("node-04")
    expect(at(docs, 1).hostnameSelector).toBeUndefined()
    expect(at(docs, 2).hostnameSelector).toBeUndefined()
  })

  test("leading `---` is tolerated (empty first doc dropped)", () => {
    const text = `---
apiVersion: v1
kind: ConfigMap
metadata:
  name: c
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(1)
    expect(at(docs, 0).kind).toBe("ConfigMap")
  })

  test("large multi-doc fixture with ≥5 distinct kinds — every kind extracted, none dropped", () => {
    const text = [
      "apiVersion: v1",
      "kind: Namespace",
      "metadata:",
      "  name: cert-manager",
      "---",
      "apiVersion: rbac.authorization.k8s.io/v1",
      "kind: ClusterRole",
      "metadata:",
      "  name: cert-manager-controller",
      "rules: []",
      "---",
      "apiVersion: rbac.authorization.k8s.io/v1",
      "kind: ClusterRoleBinding",
      "metadata:",
      "  name: cert-manager-controller",
      "roleRef:",
      "  apiGroup: rbac.authorization.k8s.io",
      "  kind: ClusterRole",
      "  name: cert-manager-controller",
      "subjects: []",
      "---",
      "apiVersion: v1",
      "kind: ServiceAccount",
      "metadata:",
      "  name: cert-manager",
      "  namespace: cert-manager",
      "---",
      "apiVersion: apps/v1",
      "kind: Deployment",
      "metadata:",
      "  name: cert-manager",
      "  namespace: cert-manager",
      "spec:",
      "  template:",
      "    spec:",
      "      containers:",
      "        - name: cert-manager",
      "          image: quay.io/jetstack/cert-manager-controller:latest",
      "---",
      "apiVersion: v1",
      "kind: Service",
      "metadata:",
      "  name: cert-manager",
      "  namespace: cert-manager",
      "spec:",
      "  ports:",
      "    - port: 9402",
      "---",
      "apiVersion: admissionregistration.k8s.io/v1",
      "kind: MutatingWebhookConfiguration",
      "metadata:",
      "  name: cert-manager-webhook",
      "webhooks: []",
      "---",
      "apiVersion: admissionregistration.k8s.io/v1",
      "kind: ValidatingWebhookConfiguration",
      "metadata:",
      "  name: cert-manager-webhook",
      "webhooks: []",
      "",
    ].join("\n")
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    const kinds = docs.map((d) => d.kind)
    expect(kinds).toEqual([
      "Namespace",
      "ClusterRole",
      "ClusterRoleBinding",
      "ServiceAccount",
      "Deployment",
      "Service",
      "MutatingWebhookConfiguration",
      "ValidatingWebhookConfiguration",
    ])
    expect(docs.every((d) => d.name !== undefined)).toBe(true)
  })

  test("each doc records its 1-based startLine", () => {
    const text = `apiVersion: v1
kind: ConfigMap
metadata:
  name: a
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: b
`
    const { docs } = scanManifestText(text)
    expect(docs).toHaveLength(2)
    expect(at(docs, 0).startLine).toBe(1)
    expect(at(docs, 1).startLine).toBe(6)
  })
})

describe("scanManifestText — workload-class selector (F2 of #11595)", () => {
  test("Deployment pinned via alanwalton.com/workload-class extracts workloadClassSelector", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: ns
spec:
  template:
    spec:
      nodeSelector:
        alanwalton.com/workload-class: database
      containers:
        - name: app
          image: app:1
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(1)
    const doc = at(docs, 0)
    expect(doc.workloadClassSelector).toBe("database")
    expect(doc.hostnameSelector).toBeUndefined()
    expect(doc.nodeSelectorKeys).toEqual([WORKLOAD_CLASS_KEY])
  })

  test("Deployment pinned by BOTH workload-class and hostname extracts both", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: ns
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-02
        alanwalton.com/workload-class: database
      containers:
        - name: app
          image: app:1
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(at(docs, 0).workloadClassSelector).toBe("database")
    expect(at(docs, 0).hostnameSelector).toBe("node-02")
  })

  test("workloadClassSelector is undefined when only a hostname is pinned", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: ns
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-04
      containers:
        - name: app
          image: app:1
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).workloadClassSelector).toBeUndefined()
  })

  test("workloadClassSelector is undefined for a non-pod-template kind (Service)", () => {
    const text = `apiVersion: v1
kind: Service
metadata:
  name: svc
spec:
  selector:
    alanwalton.com/workload-class: database
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).workloadClassSelector).toBeUndefined()
  })
})
