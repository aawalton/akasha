import {
  configmapYaml,
  litestreamConfigmapYaml,
  policyConfigmapYaml,
} from "@akasha/cluster-manifests/headscale-configmaps"
import {
  CONTROL_PLANE_LABELS,
  CONTROL_PLANE_SELECTOR_LABELS,
  NAMESPACE,
  NAMESPACE_LABELS,
  NETPOL_HEADSCALE_LABELS,
  NETPOL_SUBNET_ROUTER_LABELS,
  TLS_LABELS,
} from "@akasha/cluster-manifests/headscale-constants"
import { statefulsetYaml } from "@akasha/cluster-manifests/headscale-statefulsets"
import { synthMulti, synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { ApiObject, App, Chart } from "cdk8s"

const APP_NAME = "headscale"
const SUBNET_ROUTER_APP_NAME = "tailscale-subnet-router"

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

function certificateYaml(): string {
  const app = new App()
  const chart = new Chart(app, NAMESPACE)
  new ApiObject(chart, "certificate", {
    apiVersion: "cert-manager.io/v1",
    kind: "Certificate",
    metadata: {
      name: "headscale-tls",
      namespace: NAMESPACE,
      labels: TLS_LABELS,
    },
    spec: {
      secretName: "headscale-tls",
      secretTemplate: {
        labels: TLS_LABELS,
      },
      issuerRef: {
        name: "letsencrypt-prod",
        kind: "ClusterIssuer",
      },
      dnsNames: ["headscale.alanwalton.com"],
      duration: "2160h",
      renewBefore: "720h",
    },
  })
  return app.synthYaml()
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
          labels: NETPOL_HEADSCALE_LABELS,
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
          labels: NETPOL_HEADSCALE_LABELS,
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
      id: "allow-internet-egress",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-internet-egress",
          namespace: NAMESPACE,
          labels: NETPOL_HEADSCALE_LABELS,
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
                  ipBlock: {
                    cidr: "0.0.0.0/0",
                    except: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"],
                  },
                },
              ],
              ports: [
                { protocol: "TCP", port: 443 },
                { protocol: "TCP", port: 80 },
              ],
            },
          ],
        },
      },
    },
    {
      id: "allow-seaweedfs-egress",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-seaweedfs-egress",
          namespace: NAMESPACE,
          labels: NETPOL_HEADSCALE_LABELS,
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
                    matchLabels: { "kubernetes.io/metadata.name": "seaweedfs" },
                  },
                },
              ],
              ports: [{ protocol: "TCP", port: 8333 }],
            },
          ],
        },
      },
    },
    {
      id: "allow-public-ingress",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-public-ingress",
          namespace: NAMESPACE,
          labels: NETPOL_HEADSCALE_LABELS,
        },
        spec: {
          podSelector: {
            matchLabels: { "app.kubernetes.io/name": APP_NAME },
          },
          policyTypes: ["Ingress"],
          ingress: [
            {
              from: [{ ipBlock: { cidr: "0.0.0.0/0" } }],
              ports: [{ protocol: "TCP", port: 8443 }],
            },
          ],
        },
      },
    },
    {
      id: "allow-subnet-router-egress",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-subnet-router-egress",
          namespace: NAMESPACE,
          labels: NETPOL_SUBNET_ROUTER_LABELS,
        },
        spec: {
          podSelector: {
            matchLabels: { "app.kubernetes.io/name": SUBNET_ROUTER_APP_NAME },
          },
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
            {
              to: [
                {
                  ipBlock: {
                    cidr: "0.0.0.0/0",
                    except: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"],
                  },
                },
              ],
              ports: [
                { protocol: "TCP", port: 443 },
                { protocol: "UDP", port: 3478 },
                { protocol: "UDP", port: 41641 },
              ],
            },
            {
              to: [{ namespaceSelector: {}, podSelector: {} }],
            },
            {
              to: [
                { ipBlock: { cidr: "10.244.0.0/16" } },
                { ipBlock: { cidr: "10.96.0.0/12" } },
                { ipBlock: { cidr: "192.168.68.0/24" } },
              ],
            },
          ],
        },
      },
    },
  ])
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "headscale",
      namespace: NAMESPACE,
      labels: CONTROL_PLANE_LABELS,
      annotations: {
        "metallb.universe.tf/loadBalancerIPs": "192.168.68.240",
      },
    },
    spec: {
      type: "LoadBalancer",
      externalTrafficPolicy: "Cluster",
      selector: CONTROL_PLANE_SELECTOR_LABELS,
      ports: [
        {
          name: "https",
          port: 443,
          targetPort: "https",
          nodePort: 30443,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "configmap", yaml: configmapYaml() },
    { name: "policy-configmap", yaml: policyConfigmapYaml() },
    { name: "litestream-configmap", yaml: litestreamConfigmapYaml() },
    { name: "certificate", yaml: certificateYaml() },
    { name: "network-policy", yaml: networkPolicyYaml() },
    { name: "service", yaml: serviceYaml() },
    { name: "statefulset", yaml: statefulsetYaml() },
  ]
}
