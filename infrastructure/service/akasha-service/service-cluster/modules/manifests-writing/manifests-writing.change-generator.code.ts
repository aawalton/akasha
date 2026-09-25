import { createHash } from "node:crypto"
import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  type Resources,
  resourcesIn,
} from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import {
  type WorkloadClass,
  workloadClassMemberSelector,
} from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/cluster/k8s-type/modules/k8s-namespace/k8s-namespace.module.code.ts"
import { orchestratorCacheEntrypointPath } from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-helpers/orchestrator-cache-helpers.module.code.ts"
import {
  CONTAINER_TMP_PATH,
  CONTAINER_TMP_VOLUME,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import {
  COMMIT_PLACEHOLDER,
  webAppImage,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-imaging/web-app-imaging.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { secretAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  numberAt,
  recordsIn,
  slugsUnder,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SERVICE_CLUSTER = "service-cluster"

const WEB_APP = "web-app"

const SECRET = "secret"

const MANIFESTS = "manifests"

const DEPLOYMENT = "Deployment"

const CHECKSUM = "checksum/secrets"

const COMPONENT = "frontend"

const MANAGED_BY = "deploy-script"

const TMP_SIZE = "1Gi"

const RUN_AS = 1000

const STOP_SECONDS = "5"

const TIMEOUT_SECONDS = 5

const WORKLOAD_CLASSES: readonly WorkloadClass[] = [
  "control",
  "database",
  "build",
  "serve",
  "workers",
  "ci",
  "eso-rig",
]

const TURNS_UNDER = ["infrastructure/service/akasha-service/", "infrastructure/cluster/k8s-type/"]

export type Env =
  | { readonly name: string; readonly value: string }
  | {
      readonly name: string
      readonly valueFrom: { readonly secretKeyRef: { readonly name: string; readonly key: string } }
    }

export type Stated = {
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
}

export type Written = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_WRITTEN: Written = { edits: [], said: [] }

type Labels = Readonly<Record<string, string>>

type Probe = {
  readonly httpGet: { readonly path: string; readonly port: number }
  readonly initialDelaySeconds: number
  readonly periodSeconds: number
  readonly failureThreshold: number
  readonly timeoutSeconds: number
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

function deploymentOf(stated: Stated): string {
  const labels = labelsOf(stated)
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
          containers: [
            {
              name: stated.resourceName,
              image: webAppImage(`${stated.namespace}-${stated.resourceName}`, COMMIT_PLACEHOLDER),
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
              ],
              volumeMounts: [{ name: CONTAINER_TMP_VOLUME, mountPath: CONTAINER_TMP_PATH }],
              resources: stated.resources,
              securityContext: {
                runAsNonRoot: true,
                runAsUser: RUN_AS,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              livenessProbe: probeOf(stated, 15, 10, 6),
              readinessProbe: probeOf(stated, 5, 5, 12),
              lifecycle: { preStop: { exec: { command: ["sleep", STOP_SECONDS] } } },
            },
          ],
          volumes: [{ name: CONTAINER_TMP_VOLUME, emptyDir: { sizeLimit: TMP_SIZE } }],
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

export function secretChecksumOf(sealed: ReadonlyMap<string, string>): string {
  const summed = [...sealed.entries()].sort((one, other) => one[0].localeCompare(other[0]))
  return createHash("md5").update(JSON.stringify(summed)).digest("hex")
}

function envIn(value: Value): readonly Env[] {
  const found: Env[] = []
  for (const one of recordsIn(value.runtimeEnv)) {
    const name = textAt(one, "name")
    if (name === null) continue
    const stated = textAt(one, "value")
    if (stated !== null) {
      found.push({ name, value: stated })
      continue
    }
    const from = recordsIn(one.fromSecret)[0]
    const resource = from === undefined ? null : textAt(from, "resourceName")
    const key = from === undefined ? null : textAt(from, "resourceKey")
    if (resource === null || key === null) continue
    found.push({ name, valueFrom: { secretKeyRef: { name: resource, key } } })
  }
  return found
}

function workloadClassIn(value: Value): WorkloadClass | null {
  const said = textAt(value, "workloadClass")
  return WORKLOAD_CLASSES.find((one) => one === said) ?? null
}

function webAppNaming(shadow: Shadow, slug: string): Value | null {
  for (const listed of shadow.index.everyOfType(WEB_APP)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    if (slugsUnder(value.serviceClusters, `${SERVICE_CLUSTER}/`).includes(slug)) return value
  }
  return null
}

function sealedInto(change: Change, shadow: Shadow, resource: string): ReadonlyMap<string, string> {
  const sealed = new Map<string, string>()
  for (const listed of shadow.index.everyOfType(SECRET)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    for (const placement of recordsIn(value.placements)) {
      if (textAt(placement, "resourceName") !== resource) continue
      const key = textAt(placement, "resourceKey")
      const sidecar = secretAt(listed.path)
      const body = sidecar === null ? null : textOf(change.after(sidecar))
      if (key === null || body === null) continue
      sealed.set(key, body)
    }
  }
  return sealed
}

type Found = { readonly stated: Stated } | { readonly missing: string }

function statedFor(change: Change, shadow: Shadow, value: Value): Found {
  const slug = textAt(value, "slug") ?? ""
  if (textAt(value, "resourceKind") !== DEPLOYMENT) {
    return {
      missing: `\`${slug}\` is no ${DEPLOYMENT}, and only a web app's ${DEPLOYMENT} is written`,
    }
  }
  const namespace = textAt(value, "namespace")
  const resourceName = textAt(value, "resourceName")
  const replicas = numberAt(value, "replicas")
  const containerPort = numberAt(value, "containerPort")
  const probePath = textAt(value, "probePath")
  const workloadClass = workloadClassIn(value)
  if (
    namespace === null ||
    resourceName === null ||
    replicas === null ||
    containerPort === null ||
    probePath === null ||
    workloadClass === null
  ) {
    return {
      missing: `\`${slug}\` states no namespace, resource name, replicas, container port, probe path or workload class`,
    }
  }
  const webApp = webAppNaming(shadow, slug)
  if (webApp === null) return { missing: `no web app names \`${SERVICE_CLUSTER}/${slug}\`` }
  const sourceDirectory = textAt(webApp, "sourceDirectory")
  const secretResource = textAt(webApp, "secretResource")
  if (sourceDirectory === null || secretResource === null) {
    return {
      missing: `the web app naming \`${slug}\` states no source directory or secret resource`,
    }
  }
  const sealed = sealedInto(change, shadow, secretResource)
  if (sealed.size === 0) {
    return {
      missing: `no secret page places a value into \`${secretResource}\`, so nothing says what its checksum is over`,
    }
  }
  return {
    stated: {
      namespace,
      resourceName,
      replicas,
      containerPort,
      workloadClass,
      probePath,
      instance: textAt(value, "instanceLabel") ?? namespace,
      ownsNamespace: value.ownsNamespace === true,
      sourceDirectory,
      secretResource,
      secretChecksum: secretChecksumOf(sealed),
      env: envIn(value),
      resources: resourcesIn(value),
    },
  }
}

function writtenAt(
  change: Change,
  shadow: Shadow,
  reading: Reading,
  path: string,
  value: Value
): Written {
  const found = statedFor(change, shadow, value)
  if ("missing" in found)
    return { edits: [], said: [`no manifests were written — ${found.missing}`] }
  const at = fileOf(reading, { path, value }, SERVICE_CLUSTER, MANIFESTS)
  const written = manifestsOf(found.stated)
  const was = textOf(change.after(at))
  if (was === written) return NOTHING_WRITTEN
  return {
    edits: [
      was === null
        ? { kind: "add", path: at, content: written }
        : { kind: "replace", path: at, contentFrom: was, contentTo: written },
    ],
    said: [`\`${at}\` was written again from its cluster service's and web app's pages`],
  }
}

function writtenOver(change: Change, shadow: Shadow, reading: Reading): Written {
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  for (const listed of shadow.index.everyOfType(SERVICE_CLUSTER)) {
    const value = shadow.pageOf(listed.path)
    if (value === null || textAt(value, MANIFESTS) === null) continue
    const got = writtenAt(change, shadow, reading, listed.path, value)
    edits.push(...got.edits)
    said.push(...got.said)
  }
  return { edits, said }
}

export function couldTurn(change: Change): boolean {
  return change.changed.some((path) => TURNS_UNDER.some((under) => path.startsWith(under)))
}

export function generateChange(change: Change): Written {
  try {
    if (!couldTurn(change)) return NOTHING_WRITTEN
    const cast = shadowFor(change)
    if ("refused" in cast)
      return { edits: [], said: [`no manifests were written — ${cast.refused}`] }
    return writtenOver(change, cast.shadow, cast.reading)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `no manifests were written — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}
