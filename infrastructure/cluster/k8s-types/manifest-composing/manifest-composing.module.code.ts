import { namespaceYaml } from "../k8s-namespace/k8s-namespace.module.code.ts"

export function synthNamespaceDeploymentService(
  namespace: string,
  labels: Readonly<Record<string, string>>,
  deployment: () => string,
  service: () => string
): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(namespace, labels) },
    { name: "deployment", yaml: deployment() },
    { name: "service", yaml: service() },
  ]
}

export function synthNamespaceServiceDeployment(
  namespace: string,
  labels: Readonly<Record<string, string>>,
  service: () => string,
  deployment: () => string
): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(namespace, labels) },
    { name: "service", yaml: service() },
    { name: "deployment", yaml: deployment() },
  ]
}

export function synthNamespaceConfigmapDeploymentService(
  namespace: string,
  labels: Readonly<Record<string, string>>,
  configmap: () => string,
  deployment: () => string,
  service: () => string
): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(namespace, labels) },
    { name: "configmap", yaml: configmap() },
    { name: "deployment", yaml: deployment() },
    { name: "service", yaml: service() },
  ]
}

export function synthNamespaceCronjob(
  namespace: string,
  labels: Readonly<Record<string, string>>,
  cronjob: () => string
): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(namespace, labels) },
    { name: "cronjob", yaml: cronjob() },
  ]
}

export function synthNamespaceNetworkPolicyDeploymentService(
  namespace: string,
  labels: Readonly<Record<string, string>>,
  networkPolicy: () => string,
  deployment: () => string,
  service: () => string
): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(namespace, labels) },
    { name: "network-policy", yaml: networkPolicy() },
    { name: "deployment", yaml: deployment() },
    { name: "service", yaml: service() },
  ]
}
