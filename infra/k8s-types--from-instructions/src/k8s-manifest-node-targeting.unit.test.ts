import { describe, expect, test } from "bun:test"
import { HOSTNAME_KEY, WORKLOAD_CLASS_KEY } from "./hostnames"
import { scanManifestText } from "./k8s-manifest-scanner"

function at<T>(arr: readonly T[], i: number): T {
  const v = arr[i]
  if (v === undefined) throw new Error(`expected element at index ${i}, got undefined`)
  return v
}

describe("scanManifestText — podAffinity detection", () => {
  test("Deployment with podAffinity (no nodeSelector) → hasPodAffinity=true, selectors empty", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgbouncer
  namespace: pgbouncer
spec:
  replicas: 1
  template:
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchLabels:
                  app: postgres
              namespaces:
                - postgres
              topologyKey: kubernetes.io/hostname
      containers:
        - name: pgbouncer
          image: edoburu/pgbouncer:v1.25.1-p0
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    expect(docs).toHaveLength(1)
    const doc = at(docs, 0)
    expect(doc.hasPodTemplate).toBe(true)
    expect(doc.hasPodAffinity).toBe(true)
    expect(doc.nodeSelectorKeys).toEqual([])
    expect(doc.hostnameSelector).toBeUndefined()
    expect(doc.workloadClassSelector).toBeUndefined()
  })

  test("Deployment with only podAntiAffinity → hasPodAffinity=false", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: spread
  namespace: app
spec:
  template:
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                topologyKey: kubernetes.io/hostname
      nodeSelector:
        kubernetes.io/hostname: node-04
      containers:
        - name: spread
          image: app:1
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).hasPodAffinity).toBe(false)
  })

  test("Deployment with no affinity block → hasPodAffinity=false", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: plain
  namespace: app
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: node-04
      containers:
        - name: plain
          image: app:1
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).hasPodAffinity).toBe(false)
  })

  test("Service (non-pod-template kind) → hasPodAffinity=false", () => {
    const text = `apiVersion: v1
kind: Service
metadata:
  name: svc
  namespace: app
spec:
  selector:
    app: x
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).hasPodAffinity).toBe(false)
  })
})

describe("scanManifestText — nodeName (scheduler-bypass pin)", () => {
  test("Deployment with pod-spec nodeName → extracted", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: pinned
  namespace: app
spec:
  replicas: 1
  template:
    spec:
      nodeName: node-04
      containers:
        - name: pinned
          image: app:1
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    const doc = at(docs, 0)
    expect(doc.nodeName).toBe("node-04")
    expect(doc.nodeAffinityKeys).toEqual([])
  })

  test("Job with pod-spec nodeName → extracted (quotes stripped)", () => {
    const text = `apiVersion: batch/v1
kind: Job
metadata:
  name: host-maintenance
  namespace: app
spec:
  backoffLimit: 0
  template:
    spec:
      nodeName: "node-06"
      restartPolicy: Never
      containers:
        - name: nsenter
          image: busybox:1
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).nodeName).toBe("node-06")
  })

  test("CronJob with nodeName at the deeper jobTemplate path → extracted", () => {
    const text = `apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly
  namespace: app
spec:
  schedule: "0 3 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          nodeName: node-02
          containers:
            - name: nightly
              image: app:1
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).nodeName).toBe("node-02")
  })

  test("Deployment with no nodeName → undefined", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: plain
  namespace: app
spec:
  template:
    spec:
      containers:
        - name: plain
          image: app:1
`
    const { docs } = scanManifestText(text)
    const doc = at(docs, 0)
    expect(doc.nodeName).toBeUndefined()
    expect(doc.nodeAffinityKeys).toEqual([])
  })

  test("downward-API fieldPath: spec.nodeName is a value, not a pin → undefined", () => {
    const text = `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: promtail
  namespace: loki
spec:
  template:
    spec:
      containers:
        - name: promtail
          image: promtail:1
          env:
            - name: HOSTNAME
              valueFrom:
                fieldRef:
                  fieldPath: "spec.nodeName"
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).nodeName).toBeUndefined()
  })

  test("CRD schema property named nodeName → NOT extracted", () => {
    const text = `apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: clusters.postgresql.cnpg.io
spec:
  group: postgresql.cnpg.io
  versions:
    - name: v1
      schema:
        openAPIV3Schema:
          properties:
            spec:
              properties:
                nodeName:
                  description: NodeName is a request to schedule this pod onto a specific node.
                  type: string
`
    const { docs } = scanManifestText(text)
    const doc = at(docs, 0)
    expect(doc.kind).toBe("CustomResourceDefinition")
    expect(doc.hasPodTemplate).toBe(false)
    expect(doc.nodeName).toBeUndefined()
    expect(doc.nodeAffinityKeys).toEqual([])
  })
})

describe("scanManifestText — pod-spec nodeAffinity match keys", () => {
  test("Deployment with required + preferred matchExpressions → both branches' keys", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: affine
  namespace: app
spec:
  template:
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: alanwalton.com/workload-class
                    operator: In
                    values:
                      - database
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              preference:
                matchExpressions:
                  - key: kubernetes.io/hostname
                    operator: In
                    values:
                      - node-02
      containers:
        - name: affine
          image: app:1
`
    const { docs, errors } = scanManifestText(text)
    expect(errors).toEqual([])
    const doc = at(docs, 0)
    expect(doc.nodeAffinityKeys).toEqual([WORKLOAD_CLASS_KEY, HOSTNAME_KEY])
    expect(doc.nodeName).toBeUndefined()
  })

  test("matchFields keys are collected alongside matchExpressions", () => {
    const text = `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: fields
  namespace: app
spec:
  template:
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchFields:
                  - key: metadata.name
                    operator: In
                    values:
                      - node-03
      containers:
        - name: fields
          image: app:1
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).nodeAffinityKeys).toEqual(["metadata.name"])
  })

  test("podAffinity labelSelector matchExpressions are outside the scope → empty", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: colocated
  namespace: app
spec:
  template:
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: app
                    operator: In
                    values:
                      - postgres
              topologyKey: kubernetes.io/hostname
      containers:
        - name: colocated
          image: app:1
`
    const { docs } = scanManifestText(text)
    const doc = at(docs, 0)
    expect(doc.hasPodAffinity).toBe(true)
    expect(doc.nodeAffinityKeys).toEqual([])
  })

  test("PersistentVolume spec.nodeAffinity (exempt seam) → NOT extracted", () => {
    const text = `apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgres-data
spec:
  capacity:
    storage: 100Gi
  hostPath:
    path: /var/lib/postgres-data
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
                - node-02
`
    const { docs } = scanManifestText(text)
    const doc = at(docs, 0)
    expect(doc.kind).toBe("PersistentVolume")
    expect(doc.hasPodTemplate).toBe(false)
    expect(doc.nodeAffinityKeys).toEqual([])
    expect(doc.nodeName).toBeUndefined()
  })

  test("CRD schema property named nodeAffinity → NOT extracted", () => {
    const text = `apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: certificates.cert-manager.io
spec:
  group: cert-manager.io
  versions:
    - name: v1
      schema:
        openAPIV3Schema:
          properties:
            spec:
              properties:
                affinity:
                  properties:
                    nodeAffinity:
                      properties:
                        requiredDuringSchedulingIgnoredDuringExecution:
                          properties:
                            nodeSelectorTerms:
                              items:
                                properties:
                                  matchExpressions:
                                    items:
                                      properties:
                                        key:
                                          description: The label key that the selector applies to.
                                          type: string
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).nodeAffinityKeys).toEqual([])
  })
})
