import { synthOne } from "../cdk8s-synth/cdk8s-synth.module.code.ts"

export function namespaceYaml(namespace: string, labels: Readonly<Record<string, string>>): string {
  return synthOne(namespace, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: namespace,
      labels,
    },
  })
}
