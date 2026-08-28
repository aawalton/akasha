import { subnetRouterDeploymentYaml } from "../synth-statefulsets"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "subnet-router-deployment", yaml: subnetRouterDeploymentYaml() }]
}
