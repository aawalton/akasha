import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "prometheus",
    roleName: "pipeline-engine",
    rules: [
      {
        comment:
          "Pods (get/list for rollout status; delete for terminal-state cleanup before Recreate rollout)",
        apiGroups: [""],
        resources: ["pods"],
        verbs: ["get", "list", "delete"],
      },
      {
        comment: "Deploy manifests (deployments, services, configmaps, secrets, PVCs)",
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: [
          "services",
          "configmaps",
          "secrets",
          "persistentvolumeclaims",
          "serviceaccounts",
        ],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["rbac.authorization.k8s.io"],
        resources: ["roles", "rolebindings"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
