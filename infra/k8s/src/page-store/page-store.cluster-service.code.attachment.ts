import { synthMulti, synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { kubernetesLabels, selectorOf } from "@akasha/k8s-types/labels"

const NAMESPACE = "page-store"
const APP_NAME = "page-store"
const INSTANCE_NAME = "page-store"
const COMPONENT = "page-store-forwarder"
const PART_OF = "page-store"
const MANAGED_BY = "deploy-script"

// socat is the whole workload: one listener, one forked child per connection, no state.
const SOCAT_IMAGE = "alpine/socat:1.8.0.3"

// The port a pod calls, and the port the workstation answers on. They are deliberately the same so
// that a caller reading this address sees one number rather than a translation.
const PAGE_STORE_PORT = 8787

// The workstation is named rather than addressed: tailscaled resolves this itself when it is handed
// a CONNECT, so the page store keeps its name when its tailnet address moves.
const WORKSTATION_HOST = "workstation.alanwalton.ts.net"

// The tailnet egress that already stands. It is an outbound HTTP proxy, so it takes CONNECT and
// carries the stream out over the private network. Nothing here enrols a second tailnet node.
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

// The path the pages system service answers a question at.
const ASK_PATH = "/ask"

// The smallest true question there is: one page of the type the pages system service is itself
// described by, cut down to one row carrying one key. It costs the workstation an index read.
const READINESS_QUESTION = JSON.stringify({
  pageTypeSlug: "workstation-service",
  limit: 1,
  keys: ["slug"],
})

// wget gives up well before the probe's own timeout, so a workstation that neither answers nor
// refuses is failed by wget rather than cut off by the kubelet. A healthy round trip here is a
// few milliseconds, so two seconds is slack rather than a bound anything real runs against.
const READINESS_SECONDS = 2

// busybox's wget and grep stand in the socat image already, so this asks for no second image.
// wget exits non-zero on a refused connection, on a stream socat closes when its dial out fails,
// and on any status outside 2xx; the grep then holds the answer to one the pages system service
// itself composed rather than to anything else that might be listening.
const READINESS_COMMAND = [
  "/bin/sh",
  "-c",
  `wget -q -O- --timeout=${READINESS_SECONDS} --header='content-type: application/json' --post-data='${READINESS_QUESTION}' http://127.0.0.1:${PAGE_STORE_PORT}${ASK_PATH} | grep -q '"rows"'`,
]

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
              // -d -d reports warnings and notices, so each carried connection says so in the log.
              args: ["-d", "-d", LISTEN_ADDRESS, DIAL_ADDRESS],
              ports: [{ name: "page-store", containerPort: PAGE_STORE_PORT, protocol: "TCP" }],
              // socat answers a connection before it has dialled anything, so a bound socket says
              // nothing about the workstation. The probe therefore asks the pages system service a
              // real question back through this same forwarder, and the pod reads ready only while
              // an answer comes back.
              readinessProbe: {
                exec: { command: READINESS_COMMAND },
                initialDelaySeconds: 2,
                periodSeconds: 10,
                timeoutSeconds: 5,
                failureThreshold: 3,
              },
              // Nothing here probes liveness. socat is this container's only process, so its death
              // already restarts the container, and a check of the listener socat binds would pass
              // in every case a restart would help. A workstation that is asleep leaves this pod
              // not ready, and nothing is allowed to read that as a fault of socat's.
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
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "network-policy", yaml: networkPolicyYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
