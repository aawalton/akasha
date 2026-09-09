import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { componentLabels } from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"

export function namespaceYaml(namespace: string, component: string): string {
  return synthOne(namespace, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: { name: namespace, labels: componentLabels(component) },
  })
}
