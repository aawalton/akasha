import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"

const NAMESPACE_ID = "cloudnative-pg"
const NAMESPACE_NAME = "cnpg-system"

function namespaceYaml(): string {
  return synthOne(NAMESPACE_ID, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE_NAME,
      labels: {
        "kubernetes.io/metadata.name": NAMESPACE_NAME,
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "namespace", yaml: namespaceYaml() }]
}
