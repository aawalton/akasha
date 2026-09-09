import {
  synthMulti,
  synthOne,
} from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  kubernetesLabels,
  selectorOf,
} from "akasha/infrastructure/cluster/k8s-types/labels/labels.module.code.ts"
import { synthNamespaceNetworkPolicyDeploymentService } from "akasha/infrastructure/cluster/k8s-types/manifest-composing/manifest-composing.module.code.ts"

const NAMESPACE = "page-store"
const APP_NAME = "page-store"
const INSTANCE_NAME = "page-store"
const COMPONENT = "page-store-forwarder"
const PART_OF = "page-store"
const MANAGED_BY = "deploy-script"

const SOCAT_IMAGE = "alpine/socat:1.8.0.3"

const PAGE_STORE_PORT = 8787

const WORKSTATION_HOST = "workstation.alanwalton.ts.net"

const EGRESS_NAMESPACE = "tailnet-egress"
const EGRESS_HOST = `tailnet-egress.${EGRESS_NAMESPACE}.svc.cluster.local`
const EGRESS_PORT = 1055

const NAMESPACE_LABELS = kubernetesLabels({ name: APP_NAME, managedBy: MANAGED_BY })

const DEPLOYMENT_LABELS = kubernetesLabels({
  name: APP_NAME,
  instance: INSTANCE_NAME,
  component: COMPONENT,
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

const DEPLOYMENT_SELECTOR_LABELS = selectorOf(DEPLOYMENT_LABELS, "name-instance")

const NETPOL_LABELS = kubernetesLabels({ name: APP_NAME, managedBy: MANAGED_BY })

const LISTEN_ADDRESS = `TCP-LISTEN:${PAGE_STORE_PORT},fork,reuseaddr`

const DIAL_ADDRESS = `PROXY:${EGRESS_HOST}:${WORKSTATION_HOST}:${PAGE_STORE_PORT},proxyport=${EGRESS_PORT}`

const ASK_PATH = "/ask"

const READINESS_QUESTION = JSON.stringify({
  pageTypeSlug: "workstation-service",
  limit: 1,
  keys: ["slug"],
})

const READINESS_SECONDS = 2

const READINESS_COMMAND = [
  "/bin/sh",
  "-c",
  `wget -q -O- --timeout=${READINESS_SECONDS} --header='content-type: application/json' --post-data='${READINESS_QUESTION}' http://127.0.0.1:${PAGE_STORE_PORT}${ASK_PATH} | grep -q '"rows"'`,
]

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "page-store",
      namespace: NAMESPACE,
      labels: DEPLOYMENT_LABELS,
    },
    spec: {
      replicas: 1,
      selector: { matchLabels: DEPLOYMENT_SELECTOR_LABELS },
      template: {
        metadata: { labels: DEPLOYMENT_LABELS },
        spec: {
          terminationGracePeriodSeconds: 10,
          containers: [
            {
              name: "socat",
              image: SOCAT_IMAGE,
              command: ["socat"],
              args: ["-d", "-d", LISTEN_ADDRESS, DIAL_ADDRESS],
              ports: [{ name: "page-store", containerPort: PAGE_STORE_PORT, protocol: "TCP" }],
              readinessProbe: {
                exec: { command: READINESS_COMMAND },
                initialDelaySeconds: 2,
                periodSeconds: 10,
                timeoutSeconds: 5,
                failureThreshold: 3,
              },
              resources: {
                requests: { cpu: "10m", memory: "32Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65532,
                runAsGroup: 65532,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
        },
      },
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "page-store",
      namespace: NAMESPACE,
      labels: DEPLOYMENT_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: DEPLOYMENT_SELECTOR_LABELS,
      ports: [
        {
          name: "page-store",
          port: PAGE_STORE_PORT,
          targetPort: PAGE_STORE_PORT,
          protocol: "TCP",
        },
      ],
    },
  })
}

function networkPolicyYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "default-deny",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "default-deny",
          namespace: NAMESPACE,
          labels: NETPOL_LABELS,
        },
        spec: {
          podSelector: {},
          policyTypes: ["Ingress", "Egress"],
        },
      },
    },
    {
      id: "allow-dns-egress",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-dns-egress",
          namespace: NAMESPACE,
          labels: NETPOL_LABELS,
        },
        spec: {
          podSelector: {},
          policyTypes: ["Egress"],
          egress: [
            {
              to: [
                {
                  namespaceSelector: {
                    matchLabels: { "kubernetes.io/metadata.name": "kube-system" },
                  },
                },
              ],
              ports: [
                { protocol: "UDP", port: 53 },
                { protocol: "TCP", port: 53 },
              ],
            },
          ],
        },
      },
    },
    {
      id: "allow-egress-to-tailnet-egress",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-egress-to-tailnet-egress",
          namespace: NAMESPACE,
          labels: NETPOL_LABELS,
        },
        spec: {
          podSelector: {
            matchLabels: { "app.kubernetes.io/name": APP_NAME },
          },
          policyTypes: ["Egress"],
          egress: [
            {
              to: [
                {
                  namespaceSelector: {
                    matchLabels: { "kubernetes.io/metadata.name": EGRESS_NAMESPACE },
                  },
                },
              ],
              ports: [{ protocol: "TCP", port: EGRESS_PORT }],
            },
          ],
        },
      },
    },
    {
      id: "allow-ingress-from-the-cluster",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-ingress-from-the-cluster",
          namespace: NAMESPACE,
          labels: NETPOL_LABELS,
        },
        spec: {
          podSelector: {
            matchLabels: { "app.kubernetes.io/name": APP_NAME },
          },
          policyTypes: ["Ingress"],
          ingress: [
            {
              from: [{ namespaceSelector: {} }],
              ports: [{ protocol: "TCP", port: PAGE_STORE_PORT }],
            },
          ],
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthNamespaceNetworkPolicyDeploymentService(
    NAMESPACE,
    NAMESPACE_LABELS,
    networkPolicyYaml,
    deploymentYaml,
    serviceYaml
  )
}
