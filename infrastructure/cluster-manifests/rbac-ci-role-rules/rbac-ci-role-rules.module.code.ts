import type { Rule } from "@akasha/workflow-language/rbac-types"

export const ciRoleRules: ReadonlyArray<Rule & { comment?: string }> = [
  {
    comment:
      "The CI dispatcher creates a step pod per step in this namespace, reads its\n  # log while it runs and deletes it after. `create` here is what a namespaced\n  # Role grants and the deploy ClusterRole deliberately does not: pipeline-engine\n  # makes pods in `ci` and nowhere else.",
    apiGroups: [""],
    resources: ["pods"],
    verbs: ["get", "list", "watch", "create", "delete"],
  },
  {
    apiGroups: [""],
    resources: ["pods/log"],
    verbs: ["get", "list", "watch", "delete"],
  },
  {
    apiGroups: ["apps"],
    resources: ["deployments"],
    verbs: ["get", "list", "watch", "update", "patch"],
  },
  {
    apiGroups: ["batch"],
    resources: ["cronjobs"],
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"],
  },
]
