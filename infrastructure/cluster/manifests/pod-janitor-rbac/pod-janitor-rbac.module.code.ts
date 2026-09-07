import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "pod-janitor",
    roleName: "pipeline-engine",
    rules: [
      {
        comment: "ServiceAccount for the janitor CronJob",
        apiGroups: [""],
        resources: ["serviceaccounts"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "The janitor CronJob itself",
        apiGroups: ["batch"],
        resources: ["cronjobs"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
