import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { componentLabels } from "./synth-constants.ts"

export function namespaceYaml(namespace: string, component: string): string {
  return synthOne(namespace, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: { name: namespace, labels: componentLabels(component) },
  })
}
