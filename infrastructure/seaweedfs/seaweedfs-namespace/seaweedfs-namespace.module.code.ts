import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { componentLabels } from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"

export function namespaceYaml(namespace: string, component: string): string {
  return synthOne(namespace, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: { name: namespace, labels: componentLabels(component) },
  })
}
