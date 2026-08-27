import { describe, expect, test } from "bun:test"
import { scanManifestText } from "./k8s-manifest-scanner"

const probesOf = (text: string) => {
  const { docs } = scanManifestText(text)
  return docs.flatMap((doc) => doc.containerResources)
}

describe("readContainerProbes — what is and is not a container", () => {
  test("a container declaring no resources block still emits a probe", () => {
    const probes = probesOf(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: cainjector
spec:
  template:
    spec:
      containers:
        - name: cert-manager-cainjector
          image: quay.io/jetstack/cert-manager-cainjector:v1.16.2
          args:
            - --leader-election-namespace=kube-system
`)
    expect(probes).toHaveLength(1)
    expect(probes[0]?.containerName).toBe("cert-manager-cainjector")
    expect(probes[0]?.listKey).toBe("containers")
    expect(probes[0]?.requestMemory).toBeUndefined()
    expect(probes[0]?.limitMemory).toBeUndefined()
    expect(probes[0]?.line).toBe(9)
  })

  test("a CRD schema property spelled initContainers is not a container list", () => {
    const probes = probesOf(`apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: clusters.postgresql.cnpg.io
spec:
  versions:
    - schema:
        openAPIV3Schema:
          properties:
            initContainers:
              description: The list of init containers to run.
              items:
                properties:
                  name:
                    type: string
                  value:
                    type: string
                required:
                  - name
                  - value
                type: object
              type: array
`)
    expect(probes).toEqual([])
  })

  test("an env entry named in a sequence is not the container's name", () => {
    const probes = probesOf(`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: speaker
spec:
  template:
    spec:
      containers:
      - args:
        - --port=7472
        env:
        - name: METALLB_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: METALLB_ML_SECRET_KEY_PATH
          value: /etc/ml_secret_key
        image: quay.io/metallb/speaker:v0.14.8
        name: speaker
`)
    expect(probes).toHaveLength(1)
    expect(probes[0]?.containerName).toBe("speaker")
  })

  test("an RBAC rule's resources list emits no probe", () => {
    const probes = probesOf(`apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cert-manager-controller-issuers
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get", "list", "watch"]
`)
    expect(probes).toEqual([])
  })

  test("containers and initContainers are told apart, in file order", () => {
    const probes = probesOf(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
spec:
  template:
    spec:
      initContainers:
        - name: init-chown-data
          image: busybox:1.36
          resources:
            requests:
              memory: 64Mi
            limits:
              memory: 64Mi
      containers:
        - name: grafana
          image: grafana/grafana:11.3.0
          resources:
            requests:
              memory: 256Mi
            limits:
              memory: 256Mi
`)
    expect(probes.map((p) => [p.listKey, p.containerName])).toEqual([
      ["initContainers", "init-chown-data"],
      ["containers", "grafana"],
    ])
    expect(probes[0]?.requestMemory?.value).toBe("64Mi")
    expect(probes[1]?.limitMemory?.value).toBe("256Mi")
  })

  test("a container list written flush with its key is still a list", () => {
    const probes = probesOf(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: metrics-server
spec:
  template:
    spec:
      containers:
      - name: metrics-server
        image: registry.k8s.io/metrics-server/metrics-server:v0.8.1
        resources:
          requests:
            memory: 200Mi
`)
    expect(probes).toHaveLength(1)
    expect(probes[0]?.containerName).toBe("metrics-server")
    expect(probes[0]?.requestMemory?.value).toBe("200Mi")
    expect(probes[0]?.limitMemory).toBeUndefined()
  })

  test("an empty container list declares no containers", () => {
    const probes = probesOf(`apiVersion: v1
kind: Pod
metadata:
  name: empty
spec:
  containers: []
`)
    expect(probes).toEqual([])
  })
})
