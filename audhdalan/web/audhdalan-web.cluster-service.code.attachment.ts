import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@infra/k8s-types/hostnames"
import { orchestratorCacheChownInitContainer, orchestratorCacheInitContainer, orchestratorCacheSyncSidecar } from "@infra/k8s-types/orchestrator-cache"
import { orchestratorCacheEntrypointPath, orchestratorCacheVolumeMounts, orchestratorCacheVolumes } from "../../infra/k8s-types/src/orchestrator-cache-helpers.ts"
import {
  AUDHDALAN_WEB_CACHE,
  BUN_RUNTIME_IMAGE,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "../../infra/k8s-types/src/orchestrator-cache-locations.ts"

const NAMESPACE = "audhdalan"
const APP_NAME = "web"
const SECRET_NAME = "audhdalan-secrets"

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": NAMESPACE,
  "app.kubernetes.io/component": "frontend",
  "app.kubernetes.io/part-of": NAMESPACE,
  "app.kubernetes.io/managed-by": "deploy-script",
} as const

const SELECTOR_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": NAMESPACE,
} as const

const GIT_ACCESS_TOKEN_REF = {
  secretName: SECRET_NAME,
  secretKey: "GIT_ACCESS_TOKEN",
} as const

function webDeploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: APP_NAME, namespace: NAMESPACE, labels: RESOURCE_LABELS },
    spec: {
      replicas: 1,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: { maxSurge: 1, maxUnavailable: 0 },
      },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: { labels: RESOURCE_LABELS },
        spec: {
          nodeSelector: workloadClassMemberSelector("serve"),
          initContainers: [
            orchestratorCacheChownInitContainer(),
            orchestratorCacheInitContainer({
              gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
              location: AUDHDALAN_WEB_CACHE,
              memory: { request: "256Mi", limit: "2Gi" },
            }),
          ],
          containers: [
            {
              name: APP_NAME,
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: orchestratorCacheEntrypointPath("audhdalan/web"),
              command: ["bun", "run", "start"],
              ports: [{ containerPort: 3000, protocol: "TCP" }],
              envFrom: [{ secretRef: { name: SECRET_NAME } }],
              env: [
                { name: "NODE_ENV", value: "production" },
                { name: "AKASHA_ROOT", value: ORCHESTRATOR_CACHE_REPO_PATH },
                { name: "HOST", value: "0.0.0.0" },
                { name: "PORT", value: "3000" },
                { name: "PAGE_WRITER", value: "audhdalan-web" },
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
                httpGet: { path: "/api/health", port: 3000 },
                initialDelaySeconds: 15,
                periodSeconds: 10,
                failureThreshold: 6,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                httpGet: { path: "/api/health", port: 3000 },
                initialDelaySeconds: 5,
                periodSeconds: 5,
                failureThreshold: 12,
                timeoutSeconds: 5,
              },
              lifecycle: { preStop: { exec: { command: ["sleep", "5"] } } },
            },
            orchestratorCacheSyncSidecar({
              gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
              memory: { request: "64Mi", limit: "1Gi" },
            }),
          ],
          volumes: [...orchestratorCacheVolumes(AUDHDALAN_WEB_CACHE)],
        },
      },
    },
  })
}

function webServiceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: APP_NAME, namespace: NAMESPACE, labels: RESOURCE_LABELS },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [{ port: 3000, targetPort: 3000, protocol: "TCP" }],
    },
  })
}

export const BUILD_ENV = [] as const

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "web-deployment", yaml: webDeploymentYaml() },
    { name: "web-service", yaml: webServiceYaml() },
  ]
}
