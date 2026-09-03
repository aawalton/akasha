import { synthMulti } from "@akasha/k8s-types/cdk8s-synth"
import { kubernetesLabels } from "@akasha/k8s-types/labels"

const NAMESPACE = "metallb-system"
const NAMESPACE_ID = "metallb"

const POOL_NAME = "home-lan-pool"
const ADVERTISEMENT_NAME = "home-lan-l2"

function commonLabels(instance: string, component: string): Readonly<Record<string, string>> {
  return kubernetesLabels({
    name: "metallb",
    instance,
    component,
    partOf: "metallb",
    managedBy: "deploy-script",
  })
}

function ipPoolYaml(): string {
  return synthMulti(NAMESPACE_ID, [
    {
      id: "ip-address-pool",
      manifest: {
        apiVersion: "metallb.io/v1beta1",
        kind: "IPAddressPool",
        metadata: {
          name: POOL_NAME,
          namespace: NAMESPACE,
          labels: commonLabels(POOL_NAME, "ip-pool"),
        },
        spec: {
          addresses: ["192.168.68.240-192.168.68.247"],
        },
      },
    },
    {
      id: "l2-advertisement",
      manifest: {
        apiVersion: "metallb.io/v1beta1",
        kind: "L2Advertisement",
        metadata: {
          name: ADVERTISEMENT_NAME,
          namespace: NAMESPACE,
          labels: commonLabels(ADVERTISEMENT_NAME, "l2-advertisement"),
        },
        spec: {
          ipAddressPools: [POOL_NAME],
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "ip-pool", yaml: ipPoolYaml() }]
}
