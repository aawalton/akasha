import { synthOne } from "@akasha/k8s-types/cdk8s-synth"

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
