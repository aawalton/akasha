import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "tailnet-egress",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["services", "secrets", "namespaces"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["networking.k8s.io"],
        resources: ["networkpolicies"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
