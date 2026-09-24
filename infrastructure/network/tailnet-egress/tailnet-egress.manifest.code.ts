import {
  synthMulti,
  synthOne,
} from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { HOSTNAME_KEY } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/cluster/k8s-type/modules/k8s-namespace/k8s-namespace.module.code.ts"
import {
  kubernetesLabels,
  selectorOf,
} from "akasha/infrastructure/cluster/k8s-type/modules/labels/labels.module.code.ts"
import { tailnetEgress } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/tailnet-egress/tailnet-egress.service-cluster.ts"

const NAMESPACE = tailnetEgress.namespace
const APP_NAME = tailnetEgress.resourceName
const INSTANCE_NAME = tailnetEgress.resourceName
const COMPONENT = "egress-proxy"
const PART_OF = tailnetEgress.slug
const MANAGED_BY = "deploy-script"

const TAILSCALE_IMAGE = tailnetEgress.image

const PROXY_PORT = tailnetEgress.containerPort

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

const STATE_CLAIM = "tailnet-egress-state"

const STATE_NODE = "node-05"

const STATE_HOST_PATH = "/var/lib/tailnet-egress-state"

const STATE_CAPACITY = "1Gi"

function statePvYaml(): string {
  return synthOne(NAMESPACE, "state-pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name: STATE_CLAIM, labels: DEPLOYMENT_LABELS },
    spec: {
      capacity: { storage: STATE_CAPACITY },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      hostPath: { path: STATE_HOST_PATH, type: "DirectoryOrCreate" },
      claimRef: { namespace: NAMESPACE, name: STATE_CLAIM },
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            { matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: [STATE_NODE] }] },
          ],
        },
      },
    },
  })
}

function statePvcYaml(): string {
  return synthOne(NAMESPACE, "state-pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: { name: STATE_CLAIM, namespace: NAMESPACE, labels: DEPLOYMENT_LABELS },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: "",
      volumeName: STATE_CLAIM,
      resources: { requests: { storage: STATE_CAPACITY } },
    },
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: tailnetEgress.resourceName,
      namespace: NAMESPACE,
      labels: DEPLOYMENT_LABELS,
    },
    spec: {
      replicas: tailnetEgress.replicas,
      strategy: { type: "Recreate" },
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
                { name: "tmp", mountPath: "/tmp" },
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
            { name: "state", persistentVolumeClaim: { claimName: STATE_CLAIM } },
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
      name: tailnetEgress.resourceName,
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
    { name: "namespace", yaml: namespaceYaml(NAMESPACE, NAMESPACE_LABELS) },
    { name: "network-policy", yaml: networkPolicyYaml() },
    { name: "pv", yaml: statePvYaml() },
    { name: "pvc", yaml: statePvcYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
