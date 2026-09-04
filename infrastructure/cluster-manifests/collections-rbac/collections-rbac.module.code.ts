import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "collections",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        comment: "CronJobs",
        apiGroups: ["batch"],
        resources: ["cronjobs"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Apply manifests (services, configmaps, secrets, PVCs)",
        apiGroups: [""],
        resources: ["services", "configmaps", "secrets", "persistentvolumeclaims"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Read pod logs (diagnostics)",
        apiGroups: [""],
        resources: ["pods", "pods/log"],
        verbs: ["get", "list"],
      },
    ],
  },
]
