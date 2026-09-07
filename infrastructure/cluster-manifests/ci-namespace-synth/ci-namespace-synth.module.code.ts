import { namespaceYaml } from "@akasha/k8s-types/k8s-namespace"

const NAMESPACE = "ci"

const NAMESPACE_LABELS = {
  "kubernetes.io/metadata.name": NAMESPACE,
} as const

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "namespace", yaml: namespaceYaml(NAMESPACE, NAMESPACE_LABELS) }]
}
