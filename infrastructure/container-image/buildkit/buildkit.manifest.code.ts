import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { configChecksum } from "akasha/infrastructure/cluster/k8s-type/modules/config-checksum/config-checksum.module.code.ts"
import {
  killMemoryMbOf,
  resourcesOf,
} from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { synthNamespaceConfigmapDeploymentService } from "akasha/infrastructure/cluster/k8s-type/modules/manifest-composing/manifest-composing.module.code.ts"
import { buildkit as page } from "akasha/infrastructure/container-image/buildkit/buildkit.manifest.ts"
import { buildkit } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/buildkit/buildkit.service-cluster.ts"

const NAMESPACE = buildkit.namespace
const APP_NAME = buildkit.resourceName
const INSTANCE_NAME = "infra"
const COMPONENT = buildkit.slug
const PART_OF = "infra"
const MANAGED_BY = "deploy-script"
const BUILDKIT_IMAGE = buildkit.image

const MB_A_GIB = 1024
const BUILDKIT_MEMORY_RESERVE_GIB = 8

function goMemoryLimitGib(): number {
  return (killMemoryMbOf(page) ?? 0) / MB_A_GIB - BUILDKIT_MEMORY_RESERVE_GIB
}

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

const CONFIG_DATA = {
  "buildkitd.toml": BUILDKITD_TOML,
} as const

function configmapYaml(): string {
  return synthOne(NAMESPACE, "configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "buildkit-config",
      labels: RESOURCE_LABELS,
    },
    data: CONFIG_DATA,
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: buildkit.resourceName,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: buildkit.replicas,
      strategy: { type: "Recreate" },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          labels: RESOURCE_LABELS,
          annotations: {
            "checksum/config": configChecksum(CONFIG_DATA),
          },
        },
        spec: {
          nodeSelector: workloadClassMemberSelector("build"),
          containers: [
            {
              name: "buildkit",
              image: BUILDKIT_IMAGE,
              args: [
                "--addr",
                `tcp://0.0.0.0:${buildkit.containerPort}`,
                "--debugaddr",
                BUILDKIT_DEBUG_ADDR,
              ],
              env: [{ name: "GOMEMLIMIT", value: `${String(goMemoryLimitGib())}GiB` }],
              ports: [{ containerPort: buildkit.containerPort, protocol: "TCP" }],
              readinessProbe: {
                tcpSocket: { port: buildkit.containerPort },
                initialDelaySeconds: 3,
                periodSeconds: 5,
              },
              volumeMounts: [
                { name: "data", mountPath: "/var/lib/buildkit" },
                { name: "config", mountPath: "/etc/buildkit", readOnly: true },
              ],
              resources: resourcesOf(page),
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
      name: buildkit.resourceName,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          port: buildkit.containerPort,
          targetPort: buildkit.containerPort,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthNamespaceConfigmapDeploymentService(
    NAMESPACE,
    NAMESPACE_LABELS,
    configmapYaml,
    deploymentYaml,
    serviceYaml
  )
}
