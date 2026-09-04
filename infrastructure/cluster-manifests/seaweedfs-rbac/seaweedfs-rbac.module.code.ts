import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/seaweedfs"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "seaweedfs",
    roleName: "pipeline-engine",
    rules: [
      {
        comment: "Deploy manifests (master/volume/filer/s3-gateway Deployments)",
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        comment: "Services, configmaps, PVCs, and the generated seaweedfs-creds secret",
        apiGroups: [""],
        resources: ["services", "configmaps", "persistentvolumeclaims", "secrets"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Rollout status checks + ephemeral Job log reads",
        apiGroups: [""],
        resources: ["pods", "pods/log"],
        verbs: ["get", "list", "watch"],
      },
      {
        comment:
          "Nightly compactor CronJob + init-on-node Job for hostPath dir creation + ensure-bucket Job",
        apiGroups: ["batch"],
        resources: ["jobs", "cronjobs"],
        verbs: ["get", "list", "watch", "create", "update", "patch", "delete"],
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
    ],
  },
]
