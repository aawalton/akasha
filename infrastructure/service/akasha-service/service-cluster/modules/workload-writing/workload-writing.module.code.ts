import { basename } from "node:path"
import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  memoryQuantity,
  type Resources,
} from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import {
  type WorkloadClass,
  workloadClassMemberSelector,
} from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/cluster/k8s-type/modules/k8s-namespace/k8s-namespace.module.code.ts"
import {
  CHECKOUT_PLACEHOLDER,
  orchestratorCacheChownInitContainer,
  orchestratorCacheInitContainer,
  orchestratorCacheSyncSidecar,
  webBuildInitContainer,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import {
  orchestratorCacheEntrypointPath,
  orchestratorCacheVolumeMounts,
  orchestratorCacheVolumes,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-helpers/orchestrator-cache-helpers.module.code.ts"
import {
  type CacheLocation,
  CONTAINER_TMP_PATH,
  CONTAINER_TMP_VOLUME,
  GIT_TRANSPORT_CLONE_URL,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { COMMIT_PLACEHOLDER } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-imaging/web-app-imaging.module.code.ts"

const DEPLOYMENT = "Deployment"

const CHECKSUM = "checksum/secrets"

const COMPONENT = "frontend"

const MANAGED_BY = "deploy-script"

const TMP_SIZE = "1Gi"

const RUN_AS = 1000

const STOP_SECONDS = "5"

const TIMEOUT_SECONDS = 5

const GIT_ACCESS_TOKEN = "GIT_ACCESS_TOKEN"

const CHECKOUT_MEMORY = { request: "256Mi", limit: "2Gi" }

const CACHE_BACKING = "hostPath"

const CACHE_KIND = "DirectoryOrCreate"

const LATEST = ":latest"

const COPYING_RESOURCES = {
  requests: { cpu: "50m", memory: "256Mi" },
  limits: { memory: "256Mi" },
}

const LOCKED_DOWN = {
  runAsNonRoot: true,
  runAsUser: RUN_AS,
  readOnlyRootFilesystem: true,
  allowPrivilegeEscalation: false,
  capabilities: { drop: ["ALL"] },
}

export type Env =
  | { readonly name: string; readonly value: string }
  | {
      readonly name: string
      readonly valueFrom: { readonly secretKeyRef: { readonly name: string; readonly key: string } }
    }

export type CodeSync = {
  readonly cachePath: string
  readonly minMemoryMb: number
  readonly killMemoryMb: number
}

export type ImageCopy = {
  readonly image: string
  readonly copyFrom: string
  readonly copyTo: string
  readonly copiedFiles: readonly string[]
  readonly copyEnv: string
}

export type Stated = {
  readonly image: string
  readonly namespace: string
  readonly resourceName: string
  readonly replicas: number
  readonly containerPort: number
  readonly workloadClass: WorkloadClass
  readonly probePath: string
  readonly instance: string
  readonly ownsNamespace: boolean
  readonly sourceDirectory: string
  readonly secretResource: string
  readonly secretChecksum: string
  readonly env: readonly Env[]
  readonly resources: Resources
  readonly codeSync: CodeSync | null
  readonly imageCopies: readonly ImageCopy[]
}

type Labels = Readonly<Record<string, string>>

type Probe = {
  readonly httpGet: { readonly path: string; readonly port: number }
  readonly initialDelaySeconds: number
  readonly periodSeconds: number
  readonly failureThreshold: number
  readonly timeoutSeconds: number
}

type Pod = {
  readonly initContainers: readonly object[]
  readonly sidecars: readonly object[]
  readonly mounts: readonly object[]
  readonly volumes: readonly object[]
}

function labelsOf(stated: Stated): Labels {
  return {
    "app.kubernetes.io/name": stated.resourceName,
    "app.kubernetes.io/instance": stated.instance,
    "app.kubernetes.io/component": COMPONENT,
    "app.kubernetes.io/part-of": stated.namespace,
    "app.kubernetes.io/managed-by": MANAGED_BY,
  }
}

function selectorOf(stated: Stated): Labels {
  return {
    "app.kubernetes.io/name": stated.resourceName,
    "app.kubernetes.io/instance": stated.instance,
  }
}

function probeOf(stated: Stated, delay: number, period: number, failures: number): Probe {
  return {
    httpGet: { path: stated.probePath, port: stated.containerPort },
    initialDelaySeconds: delay,
    periodSeconds: period,
    failureThreshold: failures,
    timeoutSeconds: TIMEOUT_SECONDS,
  }
}

function locationOf(sync: CodeSync): CacheLocation {
  return {
    backing: CACHE_BACKING,
    hostPath: sync.cachePath,
    hostPathType: CACHE_KIND,
    cloneOriginUrl: GIT_TRANSPORT_CLONE_URL,
  }
}

function copiedInto(copy: ImageCopy): string {
  return `${ORCHESTRATOR_CACHE_REPO_PATH}/${copy.copyTo}`
}

function copyingOf(copy: ImageCopy): object {
  const into = copiedInto(copy)
  const name = `init-${basename(copy.copyTo)}`
  const script = [
    "set -e",
    `mkdir -p ${into}`,
    ...copy.copiedFiles.map((file) => `cp -f ${copy.copyFrom}/${file} ${into}/${file}`),
    `echo "${name}: copied into ${into}"`,
  ].join("\n")
  return {
    name,
    image: copy.image,
    imagePullPolicy: copy.image.endsWith(LATEST) ? "Always" : "IfNotPresent",
    command: ["sh", "-c", script],
    resources: COPYING_RESOURCES,
    securityContext: LOCKED_DOWN,
    volumeMounts: orchestratorCacheVolumeMounts(),
  }
}

function copiedEnv(stated: Stated): readonly Env[] {
  return stated.imageCopies.map((copy) => ({ name: copy.copyEnv, value: copiedInto(copy) }))
}

function podOf(stated: Stated): Pod {
  const sync = stated.codeSync
  if (sync === null) {
    return {
      initContainers: [],
      sidecars: [],
      mounts: [{ name: CONTAINER_TMP_VOLUME, mountPath: CONTAINER_TMP_PATH }],
      volumes: [{ name: CONTAINER_TMP_VOLUME, emptyDir: { sizeLimit: TMP_SIZE } }],
    }
  }
  const gitAccessTokenRef = { secretName: stated.secretResource, secretKey: GIT_ACCESS_TOKEN }
  const location = locationOf(sync)
  return {
    initContainers: [
      orchestratorCacheChownInitContainer(),
      orchestratorCacheInitContainer({
        gitAccessTokenRef,
        location,
        memory: CHECKOUT_MEMORY,
        commit: CHECKOUT_PLACEHOLDER,
      }),
      ...stated.imageCopies.map(copyingOf),
      webBuildInitContainer({
        packagePath: stated.sourceDirectory,
        secretName: stated.secretResource,
      }),
    ],
    sidecars: [
      orchestratorCacheSyncSidecar({
        gitAccessTokenRef,
        memory: {
          request: memoryQuantity(sync.minMemoryMb),
          limit: memoryQuantity(sync.killMemoryMb),
        },
      }),
    ],
    mounts: orchestratorCacheVolumeMounts(),
    volumes: orchestratorCacheVolumes(location),
  }
}

function imageOf(stated: Stated): string {
  return stated.codeSync === null ? `${stated.image}:${COMMIT_PLACEHOLDER}` : stated.image
}

function deploymentOf(stated: Stated): string {
  const labels = labelsOf(stated)
  const pod = podOf(stated)
  return synthOne(stated.namespace, "deployment", {
    apiVersion: "apps/v1",
    kind: DEPLOYMENT,
    metadata: { name: stated.resourceName, namespace: stated.namespace, labels },
    spec: {
      replicas: stated.replicas,
      strategy: { type: "RollingUpdate", rollingUpdate: { maxSurge: 1, maxUnavailable: 0 } },
      selector: { matchLabels: selectorOf(stated) },
      template: {
        metadata: { annotations: { [CHECKSUM]: stated.secretChecksum }, labels },
        spec: {
          nodeSelector: workloadClassMemberSelector(stated.workloadClass),
          ...(pod.initContainers.length === 0 ? {} : { initContainers: pod.initContainers }),
          containers: [
            {
              name: stated.resourceName,
              image: imageOf(stated),
              imagePullPolicy: "IfNotPresent",
              workingDir: orchestratorCacheEntrypointPath(stated.sourceDirectory),
              command: ["bun", "run", "server.ts"],
              ports: [{ containerPort: stated.containerPort, protocol: "TCP" }],
              envFrom: [{ secretRef: { name: stated.secretResource } }],
              env: [
                { name: "NODE_ENV", value: "production" },
                { name: "AKASHA_ROOT", value: ORCHESTRATOR_CACHE_REPO_PATH },
                { name: "HOST", value: "0.0.0.0" },
                { name: "PORT", value: `${stated.containerPort}` },
                ...stated.env,
                ...copiedEnv(stated),
              ],
              volumeMounts: pod.mounts,
              resources: stated.resources,
              securityContext: LOCKED_DOWN,
              livenessProbe: probeOf(stated, 15, 10, 6),
              readinessProbe: probeOf(stated, 5, 5, 12),
              lifecycle: { preStop: { exec: { command: ["sleep", STOP_SECONDS] } } },
            },
            ...pod.sidecars,
          ],
          volumes: pod.volumes,
        },
      },
    },
  })
}

function serviceOf(stated: Stated): string {
  return synthOne(stated.namespace, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: stated.resourceName, namespace: stated.namespace, labels: labelsOf(stated) },
    spec: {
      type: "ClusterIP",
      selector: selectorOf(stated),
      ports: [{ port: stated.containerPort, targetPort: stated.containerPort, protocol: "TCP" }],
    },
  })
}

export function manifestsOf(stated: Stated): string {
  const opened = stated.ownsNamespace
    ? [namespaceYaml(stated.namespace, { "kubernetes.io/metadata.name": stated.namespace })]
    : []
  return [...opened, deploymentOf(stated), serviceOf(stated)].join("---\n")
}
