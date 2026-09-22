import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import {
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
  ATLAS_WEB_CACHE,
  BUN_RUNTIME_IMAGE,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { secretChecksum } from "akasha/infrastructure/cluster/k8s-type/modules/secret-checksum/secret-checksum.module.code.ts"
import { alanwaltonAtlas } from "akasha/infrastructure/service/cluster/pages/alanwalton-atlas/alanwalton-atlas.service-cluster.ts"

const NAMESPACE = alanwaltonAtlas.namespace
const SECRET_NAME = "alanwalton-secrets"
const S3_CREDS_SECRET_NAME = "alanwalton-s3-creds"
const PACKAGE_PATH = "alan/atlas-web"

const APP_NAME = alanwaltonAtlas.resourceName

const GIT_ACCESS_TOKEN_REF = {
  secretName: SECRET_NAME,
  secretKey: "GIT_ACCESS_TOKEN",
} as const

function resourceLabels() {
  return {
    "app.kubernetes.io/name": APP_NAME,
    "app.kubernetes.io/instance": APP_NAME,
    "app.kubernetes.io/component": "frontend",
    "app.kubernetes.io/part-of": NAMESPACE,
    "app.kubernetes.io/managed-by": "deploy-script",
  } as const
}

function selectorLabels() {
  return {
    "app.kubernetes.io/name": APP_NAME,
    "app.kubernetes.io/instance": APP_NAME,
  } as const
}

function deploymentYaml(): string {
  const labels = resourceLabels()
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: APP_NAME, namespace: NAMESPACE, labels },
    spec: {
      replicas: alanwaltonAtlas.replicas,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: { maxSurge: 1, maxUnavailable: 0 },
      },
      selector: { matchLabels: selectorLabels() },
      template: {
        metadata: {
          annotations: {
            "checksum/s3-creds": secretChecksum(NAMESPACE, S3_CREDS_SECRET_NAME, [
              "access_key",
              "secret_key",
            ]),
          },
          labels,
        },
        spec: {
          nodeSelector: workloadClassMemberSelector("serve"),
          initContainers: [
            orchestratorCacheChownInitContainer(),
            orchestratorCacheInitContainer({
              gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
              location: ATLAS_WEB_CACHE,
              memory: { request: "256Mi", limit: "2Gi" },
            }),
            webBuildInitContainer({ packagePath: PACKAGE_PATH, secretName: SECRET_NAME }),
          ],
          containers: [
            {
              name: APP_NAME,
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: orchestratorCacheEntrypointPath(PACKAGE_PATH),
              command: ["bun", "run", "server.ts"],
              ports: [{ containerPort: alanwaltonAtlas.containerPort, protocol: "TCP" }],
              envFrom: [{ secretRef: { name: SECRET_NAME } }],
              env: [
                { name: "NODE_ENV", value: "production" },
                { name: "AKASHA_ROOT", value: ORCHESTRATOR_CACHE_REPO_PATH },
                { name: "HOST", value: "0.0.0.0" },
                { name: "PORT", value: `${alanwaltonAtlas.containerPort}` },
                { name: "PAGE_WRITER", value: "atlas-web" },

                {
                  name: "SEAWEEDFS_S3_ENDPOINT",
                  value: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
                },
                { name: "SEAWEEDFS_BUCKET", value: "atlas-basemap" },
                {
                  name: "SEAWEEDFS_ACCESS_KEY",
                  valueFrom: { secretKeyRef: { name: S3_CREDS_SECRET_NAME, key: "access_key" } },
                },
                {
                  name: "SEAWEEDFS_SECRET_KEY",
                  valueFrom: { secretKeyRef: { name: S3_CREDS_SECRET_NAME, key: "secret_key" } },
                },
                {
                  name: "NEXT_PUBLIC_PROTOMAPS_PMTILES_URL",
                  value: "https://atlas.alanwalton.com/basemap/na-eu.pmtiles",
                },
                {
                  name: "PROTOMAPS_PMTILES_URL",
                  value: "https://atlas.alanwalton.com/basemap/na-eu.pmtiles",
                },
              ],
              volumeMounts: orchestratorCacheVolumeMounts(),
              resources: {
                requests: { cpu: "100m", memory: "512Mi" },
                limits: { cpu: "500m", memory: "512Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              livenessProbe: {
                httpGet: { path: "/api/health", port: alanwaltonAtlas.containerPort },
                initialDelaySeconds: 15,
                periodSeconds: 10,
                failureThreshold: 6,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                httpGet: { path: "/api/health", port: alanwaltonAtlas.containerPort },
                initialDelaySeconds: 5,
                periodSeconds: 5,
                failureThreshold: 12,
                timeoutSeconds: 5,
              },
              lifecycle: { preStop: { exec: { command: ["sleep", "5"] } } },
            },
            orchestratorCacheSyncSidecar({
              gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
              memory: { request: "256Mi", limit: "2Gi" },
            }),
          ],
          volumes: [...orchestratorCacheVolumes(ATLAS_WEB_CACHE)],
        },
      },
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: APP_NAME, namespace: NAMESPACE, labels: resourceLabels() },
    spec: {
      type: "ClusterIP",
      selector: selectorLabels(),
      ports: [
        {
          port: alanwaltonAtlas.containerPort,
          targetPort: alanwaltonAtlas.containerPort,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: `${APP_NAME}-deployment`, yaml: deploymentYaml() },
    { name: `${APP_NAME}-service`, yaml: serviceYaml() },
  ]
}
