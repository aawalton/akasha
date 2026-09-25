import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { resourcesOf } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { webServiceYaml } from "akasha/infrastructure/cluster/k8s-type/modules/k8s-web-service/k8s-web-service.module.code.ts"
import { synthWebDeploymentService } from "akasha/infrastructure/cluster/k8s-type/modules/manifest-composing/manifest-composing.module.code.ts"
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
  AUDHDALAN_WEB_CACHE,
  BUN_RUNTIME_IMAGE,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { audhdalanWeb } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/audhdalan-web/audhdalan-web.service-cluster.ts"
import { audhdalanWebManifests as page } from "akasha/product/audhdalan/web/manifests/audhdalan-web-manifests.manifest.ts"

const NAMESPACE = audhdalanWeb.namespace
const APP_NAME = audhdalanWeb.resourceName
const SECRET_NAME = "audhdalan-secrets"
const PACKAGE_PATH = "product/audhdalan/web"

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
      replicas: audhdalanWeb.replicas,
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
            webBuildInitContainer({ packagePath: PACKAGE_PATH, secretName: SECRET_NAME }),
          ],
          containers: [
            {
              name: APP_NAME,
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: orchestratorCacheEntrypointPath(PACKAGE_PATH),
              command: ["bun", "run", "server.ts"],
              ports: [{ containerPort: audhdalanWeb.containerPort, protocol: "TCP" }],
              envFrom: [{ secretRef: { name: SECRET_NAME } }],
              env: [
                { name: "NODE_ENV", value: "production" },
                { name: "AKASHA_ROOT", value: ORCHESTRATOR_CACHE_REPO_PATH },
                { name: "HOST", value: "0.0.0.0" },
                { name: "PORT", value: `${audhdalanWeb.containerPort}` },
                { name: "PAGE_WRITER", value: "audhdalan-web" },
              ],
              volumeMounts: orchestratorCacheVolumeMounts(),
              resources: resourcesOf(page),
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              livenessProbe: {
                httpGet: { path: "/api/health", port: audhdalanWeb.containerPort },
                initialDelaySeconds: 15,
                periodSeconds: 10,
                failureThreshold: 6,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                httpGet: { path: "/api/health", port: audhdalanWeb.containerPort },
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

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthWebDeploymentService(webDeploymentYaml, () =>
    webServiceYaml(
      NAMESPACE,
      APP_NAME,
      audhdalanWeb.containerPort,
      RESOURCE_LABELS,
      SELECTOR_LABELS
    )
  )
}
