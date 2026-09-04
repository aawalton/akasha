import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/voice-inference"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "voice",
    roleName: "pipeline-engine",
    rules: [
      {
        comment: "Deploy the voice-infer Deployment and read its rollout status",
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        comment: "Deploy the voice-infer ClusterIP Service",
        apiGroups: [""],
        resources: ["services"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Stamp the content-hash skip ConfigMap in the voice namespace",
        apiGroups: [""],
        resources: ["configmaps"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["secrets"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
