import { synthOne } from "@infra/k8s-types/cdk8s-synth"

const NAMESPACE = "page-query-service"
const APP_NAME = "page-query-service"
const SERVICE_NAME = "page-query-service"
const HTTP_PORT = 8787
const WORKSTATION_LAN_IP = "192.168.68.50"

const RESOURCE_LABELS = {
  app: APP_NAME,
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": APP_NAME,
  "app.kubernetes.io/component": "page-query",
  "app.kubernetes.io/part-of": APP_NAME,
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

const NAMESPACE_LABELS = {
  "kubernetes.io/metadata.name": NAMESPACE,
} as const

function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE,
      labels: NAMESPACE_LABELS,
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "page-query-service-service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: SERVICE_NAME,
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      ports: [
        {
          name: "http",
          port: HTTP_PORT,
          targetPort: HTTP_PORT,
          protocol: "TCP",
        },
      ],
    },
  })
}

function endpointSliceYaml(): string {
  return synthOne(NAMESPACE, "page-query-service-endpointslice", {
    apiVersion: "discovery.k8s.io/v1",
    kind: "EndpointSlice",
    metadata: {
      name: SERVICE_NAME,
      namespace: NAMESPACE,
      labels: {
        ...RESOURCE_LABELS,
        "kubernetes.io/service-name": SERVICE_NAME,
      },
    },
    addressType: "IPv4",
    endpoints: [
      {
        addresses: [WORKSTATION_LAN_IP],
        conditions: { ready: true },
      },
    ],
    ports: [
      {
        name: "http",
        port: HTTP_PORT,
        protocol: "TCP",
      },
    ],
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "service", yaml: serviceYaml() },
    { name: "endpointslice", yaml: endpointSliceYaml() },
  ]
}
