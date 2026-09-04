import { kubernetesLabels, selectorOf } from "@akasha/k8s-types/labels"

export const NAMESPACE = "headscale"
const APP_NAME = "headscale"
const INSTANCE_NAME = "headscale"
const CONTROL_PLANE_COMPONENT = "control-plane"
const TLS_COMPONENT = "tls"
const PART_OF = "headscale"
const MANAGED_BY = "deploy-script"

const SUBNET_ROUTER_APP_NAME = "tailscale-subnet-router"
const SUBNET_ROUTER_INSTANCE = "talos-subnet-router"
const SUBNET_ROUTER_COMPONENT = "data-plane"

export const HEADSCALE_IMAGE = "headscale/headscale:0.28.0"
export const TAILSCALE_IMAGE = "tailscale/tailscale:v1.98.10"
export const LITESTREAM_IMAGE = "litestream/litestream:0.5.4"

export const NAMESPACE_LABELS = kubernetesLabels({
  name: APP_NAME,
  managedBy: MANAGED_BY,
})

export const CONTROL_PLANE_LABELS = kubernetesLabels({
  name: APP_NAME,
  instance: INSTANCE_NAME,
  component: CONTROL_PLANE_COMPONENT,
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const CONTROL_PLANE_SELECTOR_LABELS = selectorOf(CONTROL_PLANE_LABELS, "name-instance")

export const TLS_LABELS = kubernetesLabels({
  name: APP_NAME,
  instance: INSTANCE_NAME,
  component: TLS_COMPONENT,
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const SUBNET_ROUTER_LABELS = kubernetesLabels({
  name: SUBNET_ROUTER_APP_NAME,
  instance: SUBNET_ROUTER_INSTANCE,
  component: SUBNET_ROUTER_COMPONENT,
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const SUBNET_ROUTER_SELECTOR_LABELS = selectorOf(SUBNET_ROUTER_LABELS, "name-instance")

export const NETPOL_HEADSCALE_LABELS = kubernetesLabels({
  name: APP_NAME,
  managedBy: MANAGED_BY,
})

export const NETPOL_SUBNET_ROUTER_LABELS = kubernetesLabels({
  name: SUBNET_ROUTER_APP_NAME,
  managedBy: MANAGED_BY,
})
