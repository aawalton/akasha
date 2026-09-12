import { synthMulti } from "akasha/infrastructure/cluster/k8s-types/modules/cdk8s-synth/cdk8s-synth.module.code.ts"

const REACH_NAME = "cluster-reach"

const RBAC_API = "rbac.authorization.k8s.io/v1"

function reachYaml(): string {
  return synthMulti("cluster-reach", [
    {
      id: "namespace",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: REACH_NAME,
          labels: {
            "kubernetes.io/metadata.name": REACH_NAME,
          },
        },
      },
    },
    {
      id: "service-account",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: REACH_NAME,
          namespace: REACH_NAME,
        },
      },
    },
    {
      id: "cluster-role",
      manifest: {
        apiVersion: RBAC_API,
        kind: "ClusterRole",
        metadata: {
          name: REACH_NAME,
        },
        rules: [
          {
            apiGroups: [""],
            resources: ["namespaces", "services"],
            verbs: ["get", "list", "watch"],
          },
          {
            apiGroups: [""],
            resources: ["services/proxy"],
            verbs: ["get", "create"],
          },
          {
            apiGroups: [""],
            resources: ["pods", "pods/log"],
            verbs: ["get", "list", "watch"],
          },
          {
            apiGroups: [""],
            resources: ["pods"],
            verbs: ["create", "delete"],
          },
          {
            apiGroups: ["apps"],
            resources: ["deployments", "deployments/status", "statefulsets"],
            verbs: ["get", "list", "watch"],
          },
          {
            apiGroups: ["apps"],
            resources: ["deployments"],
            verbs: ["create", "update", "patch", "delete"],
          },
          {
            apiGroups: ["batch"],
            resources: ["jobs"],
            verbs: ["get", "list", "watch", "create", "delete"],
          },
        ],
      },
    },
    {
      id: "cluster-role-binding",
      manifest: {
        apiVersion: RBAC_API,
        kind: "ClusterRoleBinding",
        metadata: {
          name: REACH_NAME,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: REACH_NAME,
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: REACH_NAME,
            namespace: REACH_NAME,
          },
        ],
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "cluster-reach", yaml: reachYaml() }]
}
