import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"

const NAMESPACE = "buildkit"
const APP_NAME = "buildkit"
const INSTANCE_NAME = "infra"
const COMPONENT = "buildkit"
const PART_OF = "infra"
const MANAGED_BY = "deploy-script"
const BUILDKIT_IMAGE = "moby/buildkit:v0.28.0"

export const BUILDKIT_MEMORY_LIMIT_GIB = 20
const BUILDKIT_MEMORY_RESERVE_GIB = 8
export const BUILDKIT_GOMEMLIMIT_GIB = BUILDKIT_MEMORY_LIMIT_GIB - BUILDKIT_MEMORY_RESERVE_GIB

const BUILDKIT_DEBUG_ADDR = "127.0.0.1:6060"

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const SELECTOR_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
} as const

const NAMESPACE_LABELS = {
  "kubernetes.io/metadata.name": NAMESPACE,
} as const

const BUILDKITD_TOML = [
  '[registry."registry.registry.svc.cluster.local:5000"]',
  "  http = false",
  "  insecure = true",
  "",
  "[worker.oci]",
  "  gc = true",
  "  # Keep up to 50 GB of build cache on the disk-backed emptyDir at",
  "  # /var/lib/buildkit (the build node's /var ephemeral volume). Cache lives outside",
  "  # the pod's memory cgroup so the full cgroup is available to build processes.",
  "  gckeepstorage = 50000",
  "  # Eight concurrent Solves: matches the observed pipeline-workload queue",
  "  # depth, which routinely hits 8+ concurrent buildctl invocations against",
  "  # this single daemon (project #9870). Kept at 8 by project #14493 — the",
  "  # node-06 co-tenancy memory budget is met at request=limit=20 Gi without",
  "  # trading build speed (see the Deployment resources block and the buildkit",
  "  # CLAUDE.md memory-sizing rationale). Measured cgroup peaks scale",
  "  # sublinearly with N (N=1 ~11 Gi, N=2 ~11.1 Gi, N=4 ~15 Gi); the true",
  "  # resident working set on node-06 is ~13.5 Gi under real N=8 pipelines.",
  "  # The rare OOMKill is absorbed by the buildctl caller's 170s retry budget",
  "  # in wrapBuildctlWithRetry (sole caller surface since #10097). History:",
  "  # #9754 parallelism=1; #9870 walked it 1 -> 2 -> 4 -> 8 after empirical",
  "  # sublinearity confirmation at each step.",
  "  max-parallelism = 8",
  "",
].join("\n")

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

function configmapYaml(): string {
  return synthOne(NAMESPACE, "configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "buildkit-config",
      labels: RESOURCE_LABELS,
    },
    data: {
      "buildkitd.toml": BUILDKITD_TOML,
    },
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "buildkit",
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          labels: RESOURCE_LABELS,
          annotations: {
            "checksum/config": "PLACEHOLDER",
          },
        },
        spec: {
          nodeSelector: workloadClassMemberSelector("build"),
          containers: [
            {
              name: "buildkit",
              image: BUILDKIT_IMAGE,
              args: ["--addr", "tcp://0.0.0.0:1234", "--debugaddr", BUILDKIT_DEBUG_ADDR],
              env: [{ name: "GOMEMLIMIT", value: `${BUILDKIT_GOMEMLIMIT_GIB}GiB` }],
              ports: [{ containerPort: 1234, protocol: "TCP" }],
              readinessProbe: {
                tcpSocket: { port: 1234 },
                initialDelaySeconds: 3,
                periodSeconds: 5,
              },
              volumeMounts: [
                { name: "data", mountPath: "/var/lib/buildkit" },
                { name: "config", mountPath: "/etc/buildkit", readOnly: true },
              ],
              resources: {
                requests: { cpu: "4000m", memory: `${BUILDKIT_MEMORY_LIMIT_GIB}Gi` },
                limits: { memory: `${BUILDKIT_MEMORY_LIMIT_GIB}Gi` },
              },
              securityContext: {
                privileged: true,
              },
            },
          ],
          volumes: [
            {
              name: "data",
              emptyDir: {},
            },
            {
              name: "config",
              configMap: {
                name: "buildkit-config",
                items: [{ key: "buildkitd.toml", path: "buildkitd.toml" }],
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
      name: "buildkit",
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          port: 1234,
          targetPort: 1234,
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
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
