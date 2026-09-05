import {
  configmapYaml,
  deploymentYaml,
  namespaceYaml,
  serviceYaml,
} from "../loki-manifests/loki-manifests.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "configmap", yaml: configmapYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
