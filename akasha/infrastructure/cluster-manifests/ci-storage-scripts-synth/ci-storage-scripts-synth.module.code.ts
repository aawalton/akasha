import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { PRUNE_CI_STORAGE_SCRIPT } from "../ci-storage-prune-script/ci-storage-prune-script.module.code.ts"

export const NAMESPACE = "ci"
const INSTANCE_NAME = "infra"
const COMPONENT = "gc"
const PART_OF = "ci-tools"
const MANAGED_BY = "deploy-script"

export function resourceLabels(appName: string) {
  return {
    "app.kubernetes.io/name": appName,
    "app.kubernetes.io/instance": INSTANCE_NAME,
    "app.kubernetes.io/component": COMPONENT,
    "app.kubernetes.io/part-of": PART_OF,
    "app.kubernetes.io/managed-by": MANAGED_BY,
  } as const
}

export function podLabels(appName: string) {
  return {
    "app.kubernetes.io/name": appName,
    "app.kubernetes.io/instance": INSTANCE_NAME,
    "app.kubernetes.io/component": COMPONENT,
  } as const
}

export function ciStorageScriptsConfigMapYaml(): string {
  return synthOne(NAMESPACE, "ci-storage-scripts", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "ci-storage-scripts",
      namespace: NAMESPACE,
      labels: resourceLabels("ci-storage-scripts"),
    },
    data: {
      "prune-ci-storage.sh": PRUNE_CI_STORAGE_SCRIPT,
    },
  })
}
