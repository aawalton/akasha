import { synthMulti, synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { kubernetesLabels, selectorOf } from "@akasha/k8s-types/labels"

const NAMESPACE = "tailnet-egress"
const APP_NAME = "tailnet-egress"
const INSTANCE_NAME = "tailnet-egress"
const COMPONENT = "egress-proxy"
const PART_OF = "tailnet-egress"
const MANAGED_BY = "deploy-script"

const TAILSCALE_IMAGE = "tailscale/tailscale:v1.98.10"

const PROXY_PORT = 1055

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

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "tailnet-egress",
      namespace: NAMESPACE,
      labels: DEPLOYMENT_LABELS,
    },
    spec: {
      replicas: 1,
      selector: { matchLabels: DEPLOYMENT_SELECTOR_LABELS },
      template: {
        metadata: { labels: DEPLOYMENT_LABELS },
        spec: {
          terminationGracePeriodSeconds: 30,
          hostAliases: [
            {
              ip: "192.168.68.240",
              hostnames: ["headscale.alanwalton.com"],
            },
          ],
          containers: [
            {
              name: "tailscale",
              image: TAILSCALE_IMAGE,
              env: [
                {
                  name: "TS_AUTHKEY",
                  valueFrom: {
                    secretKeyRef: { name: "tailnet-egress-auth", key: "TS_AUTHKEY" },
                  },
                },
                {
                  name: "TS_EXTRA_ARGS",
                  value: "--login-server=https://headscale.alanwalton.com --accept-dns=false",
                },
                {
                  name: "TS_TAILSCALED_EXTRA_ARGS",
                  value: `--outbound-http-proxy-listen=0.0.0.0:${PROXY_PORT}`,
                },
                { name: "TS_USERSPACE", value: "true" },
                { name: "TS_STATE_DIR", value: "/var/lib/tailscale" },
                { name: "TS_HOSTNAME", value: "tailnet-egress" },
                { name: "TS_KUBE_SECRET", value: "" },
              ],
              ports: [{ name: "http-proxy", containerPort: PROXY_PORT, protocol: "TCP" }],
              volumeMounts: [
                { name: "state", mountPath: "/var/lib/tailscale" },
                { name: "tmp", mountPath: "/var/tmp" },
                { name: "run", mountPath: "/run" },
              ],
              resources: {
                requests: { cpu: "50m", memory: "512Mi" },
                limits: { memory: "512Mi" },
              },
              securityContext: {
                runAsUser: 0,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
          volumes: [
            { name: "tmp", emptyDir: {} },
            { name: "run", emptyDir: {} },
            { name: "state", emptyDir: {} },
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
      name: "tailnet-egress",
      namespace: NAMESPACE,
      labels: DEPLOYMENT_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: DEPLOYMENT_SELECTOR_LABELS,
      ports: [
        {
          name: "http-proxy",
          port: PROXY_PORT,
          targetPort: PROXY_PORT,
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
      id: "allow-ingress-from-auth-proxy",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-ingress-from-auth-proxy",
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
              from: [
                {
                  namespaceSelector: {
                    matchLabels: { "kubernetes.io/metadata.name": "auth-proxy" },
                  },
                },
              ],
              ports: [{ protocol: "TCP", port: PROXY_PORT }],
            },
          ],
        },
      },
    },
    {
      id: "allow-egress-tailnet",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: {
          name: "allow-egress-tailnet",
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
              to: [{ ipBlock: { cidr: "192.168.68.0/24" } }],
              ports: [{ protocol: "TCP", port: 443 }],
            },
          ],
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "network-policy", yaml: networkPolicyYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
