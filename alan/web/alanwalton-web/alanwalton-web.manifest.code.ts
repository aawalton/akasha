import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import {
  orchestratorCacheChownInitContainer,
  orchestratorCacheInitContainer,
  orchestratorCacheSyncSidecar,
} from "akasha/infrastructure/cluster/k8s-types/orchestrator-cache/orchestrator-cache.module.code.ts"
import {
  orchestratorCacheEntrypointPath,
  orchestratorCacheVolumeMounts,
  orchestratorCacheVolumes,
} from "akasha/infrastructure/cluster/k8s-types/orchestrator-cache-helpers/orchestrator-cache-helpers.module.code.ts"
import {
  ALANWALTON_WEB_CACHE,
  BUN_RUNTIME_IMAGE,
  CONTAINER_TMP_PATH,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-types/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { secretChecksum } from "akasha/infrastructure/cluster/k8s-types/secret-checksum/secret-checksum.module.code.ts"

const NAMESPACE = "alanwalton"
const APP_NAME = "web"
const SECRET_NAME = "alanwalton-secrets"
const S3_CREDS_SECRET_NAME = "alanwalton-s3-creds"

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

function webBuildInitContainer(): object {
  const script = [
    "set -e",
    `cd ${orchestratorCacheEntrypointPath("alan/web")}`,
    "if [ -f build/server/index.js ]; then",
    '  echo "init-build: a build is beside the server already"',
    "  exit 0",
    "fi",
    `NEXT_PUBLIC_BUILD_SHA=$(git -C ${ORCHESTRATOR_CACHE_REPO_PATH} rev-parse HEAD)`,
    "VITE_BUILD_SHA=$NEXT_PUBLIC_BUILD_SHA",
    "export NEXT_PUBLIC_BUILD_SHA VITE_BUILD_SHA",
    'echo "init-build: building alan/web at $NEXT_PUBLIC_BUILD_SHA"',
    "bun run build",
    'echo "init-build: build complete"',
  ].join("\n")

  return {
    name: "init-build",
    image: BUN_RUNTIME_IMAGE,
    imagePullPolicy: "IfNotPresent",
    command: ["sh", "-c", script],
    envFrom: [{ secretRef: { name: SECRET_NAME } }],
    env: [
      { name: "HOME", value: CONTAINER_TMP_PATH },
      { name: "NODE_ENV", value: "production" },
      { name: "NEXT_PUBLIC_SUPABASE_URL", value: "https://supabase.alanwalton.com" },
      { name: "VITE_SUPABASE_URL", value: "https://supabase.alanwalton.com" },
      {
        name: "NEXT_PUBLIC_ELECTRIC_URL",
        value: "https://supabase.alanwalton.com/electric/v1/shape",
      },
      { name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".alanwalton.com" },
      { name: "VITE_SUPABASE_COOKIE_DOMAIN", value: ".alanwalton.com" },
    ],
    resources: {
      requests: { cpu: "500m", memory: "1Gi" },
      limits: { memory: "4Gi" },
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
      readOnlyRootFilesystem: true,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
    },
    volumeMounts: orchestratorCacheVolumeMounts(),
  }
}

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
        metadata: {
          annotations: {
            "checksum/s3-creds": secretChecksum(NAMESPACE, S3_CREDS_SECRET_NAME, [
              "access_key",
              "secret_key",
            ]),
          },
          labels: RESOURCE_LABELS,
        },
        spec: {
          nodeSelector: workloadClassMemberSelector("serve"),
          initContainers: [
            orchestratorCacheChownInitContainer(),
            orchestratorCacheInitContainer({
              gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
              location: ALANWALTON_WEB_CACHE,
              memory: { request: "256Mi", limit: "2Gi" },
            }),
            webBuildInitContainer(),
          ],
          containers: [
            {
              name: APP_NAME,
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: orchestratorCacheEntrypointPath("alan/web"),
              command: ["bun", "run", "start"],
              ports: [{ containerPort: 3000, protocol: "TCP" }],
              envFrom: [{ secretRef: { name: SECRET_NAME } }],
              env: [
                { name: "NODE_ENV", value: "production" },
                { name: "AKASHA_ROOT", value: ORCHESTRATOR_CACHE_REPO_PATH },
                { name: "HOST", value: "0.0.0.0" },
                { name: "PORT", value: "3000" },
                { name: "PAGE_WRITER", value: "alanwalton-web" },
                { name: "NEXT_PUBLIC_SUPABASE_URL", value: "https://supabase.alanwalton.com" },
                { name: "SUPABASE_URL", value: "https://supabase.alanwalton.com" },
                { name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".alanwalton.com" },
                {
                  name: "SUPABASE_JWT_SECRET",
                  valueFrom: { secretKeyRef: { name: SECRET_NAME, key: "JWT_SECRET" } },
                },
                {
                  name: "SEAWEEDFS_S3_ENDPOINT",
                  value: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
                },
                { name: "SEAWEEDFS_BUCKET", value: "agent-sessions" },
                {
                  name: "SEAWEEDFS_ACCESS_KEY",
                  valueFrom: { secretKeyRef: { name: S3_CREDS_SECRET_NAME, key: "access_key" } },
                },
                {
                  name: "SEAWEEDFS_SECRET_KEY",
                  valueFrom: { secretKeyRef: { name: S3_CREDS_SECRET_NAME, key: "secret_key" } },
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
              memory: { request: "256Mi", limit: "2Gi" },
            }),
          ],
          volumes: [...orchestratorCacheVolumes(ALANWALTON_WEB_CACHE)],
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

export const BUILD_ENV = [
  { name: "NEXT_PUBLIC_SUPABASE_URL", value: "https://supabase.alanwalton.com" },
  { name: "VITE_SUPABASE_URL", value: "https://supabase.alanwalton.com" },
  {
    name: "NEXT_PUBLIC_ELECTRIC_URL",
    value: "https://supabase.alanwalton.com/electric/v1/shape",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    fromSecret: { name: SECRET_NAME, key: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
  },
  {
    name: "VITE_SUPABASE_ANON_KEY",
    fromSecret: { name: SECRET_NAME, key: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
  },
  { name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".alanwalton.com" },
  { name: "VITE_SUPABASE_COOKIE_DOMAIN", value: ".alanwalton.com" },
] as const

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "web-deployment", yaml: webDeploymentYaml() },
    { name: "web-service", yaml: webServiceYaml() },
  ]
}
