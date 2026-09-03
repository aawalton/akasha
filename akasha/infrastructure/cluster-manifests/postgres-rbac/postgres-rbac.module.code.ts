import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "postgres",
    roleName: "pipeline-engine-cnpg",
    rules: [
      {
        comment: "CNPG Cluster (#11608) + daily ScheduledBackup (#11723) CRs",
        apiGroups: ["postgresql.cnpg.io"],
        resources: ["clusters", "scheduledbackups"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        comment: "Barman Cloud ObjectStore CR — the backup destination (#11723)",
        apiGroups: ["barmancloud.cnpg.io"],
        resources: ["objectstores"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["secrets"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
