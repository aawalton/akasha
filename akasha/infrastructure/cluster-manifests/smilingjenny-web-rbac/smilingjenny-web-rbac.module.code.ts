import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/smilingjenny-web"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "smilingjenny",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        comment: "Deployment rollouts",
        apiGroups: ["apps"],
        resources: ["deployments"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: ["apps"],
        resources: ["deployments/scale"],
        verbs: ["get", "patch"],
      },
      {
        apiGroups: ["apps"],
        resources: ["deployments/status"],
        verbs: ["get"],
      },
      {
        comment: "Apply manifests (services, configmaps, secrets, PVCs, statefulsets)",
        apiGroups: [""],
        resources: ["services", "configmaps", "secrets", "persistentvolumeclaims"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["apps"],
        resources: ["statefulsets"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        comment: "Migration jobs",
        apiGroups: ["batch"],
        resources: ["jobs"],
        verbs: ["get", "list", "create", "delete", "watch"],
      },
      {
        comment: "CronJobs",
        apiGroups: ["batch"],
        resources: ["cronjobs"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "RBAC + ServiceAccounts",
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
        comment: "Pod access (logs, exec)",
        apiGroups: [""],
        resources: ["pods", "pods/log"],
        verbs: ["get", "list"],
      },
      {
        apiGroups: [""],
        resources: ["pods/exec"],
        verbs: ["create"],
      },
    ],
  },
]
