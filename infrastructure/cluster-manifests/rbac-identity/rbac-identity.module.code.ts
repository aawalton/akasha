export const LABELS = {
  "app.kubernetes.io/name": "pipeline-engine",
  "app.kubernetes.io/instance": "ci",
  "app.kubernetes.io/component": "ci-pipeline",
  "app.kubernetes.io/part-of": "ci",
  "app.kubernetes.io/managed-by": "deploy-script",
}

export const SA_NAME = "pipeline-engine"
export const SA_NAMESPACE = "ci"

export const SUBJECTS = `  - kind: ServiceAccount
    name: ${SA_NAME}
    namespace: ${SA_NAMESPACE}`

export const CI_ROLE_NAME = "pipeline-engine"
