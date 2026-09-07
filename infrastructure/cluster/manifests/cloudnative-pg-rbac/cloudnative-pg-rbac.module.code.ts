import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "cnpg-system",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        apiGroups: [""],
        resources: ["configmaps"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
