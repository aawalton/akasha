import { synthMulti } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  NAMESPACE,
  NETPOL_HEADSCALE_LABELS,
  NETPOL_SUBNET_ROUTER_LABELS,
} from "../../../headscale-constants/headscale-constants.module.code.ts"

const APP_NAME = "headscale"
const SUBNET_ROUTER_APP_NAME = "tailscale-subnet-router"

export function networkPolicyYaml(): string {
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
