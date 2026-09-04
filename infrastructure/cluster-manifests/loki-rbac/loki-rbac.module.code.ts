import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/loki-service"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "loki",
    roleName: "pipeline-engine",
    rules: [
      {
        comment: "Deploy manifests (deployments, daemonsets, services, configmaps)",
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status", "daemonsets", "daemonsets/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["services", "configmaps", "secrets"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["rbac.authorization.k8s.io"],
        resources: ["roles", "rolebindings"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["serviceaccounts"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Proxy to Loki service for log queries (get_loki_logs MCP tool)",
        apiGroups: [""],
        resources: ["services/proxy"],
        verbs: ["get"],
      },
    ],
  },
]
