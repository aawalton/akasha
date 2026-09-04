import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "supabase-realtime",
    roleName: "pipeline-engine",
    rules: [
      {
        comment: "Deploy manifests (deployments, services, configmaps, secrets)",
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
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
        comment: "Tenant-upsert step runs a Job that curls the Realtime /api/tenants endpoint",
        apiGroups: ["batch"],
        resources: ["jobs"],
        verbs: ["get", "list", "watch", "create", "delete"],
      },
      {
        apiGroups: [""],
        resources: ["pods", "pods/log"],
        verbs: ["get", "list", "watch"],
      },
    ],
  },
]
