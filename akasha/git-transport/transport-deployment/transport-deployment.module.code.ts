import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"
import {
  orchestratorCacheInitContainer,
  orchestratorCacheSyncSidecar,
} from "@akasha/k8s-types/orchestrator-cache"
import {
  orchestratorCacheVolumeMounts,
  orchestratorCacheVolumes,
} from "@akasha/k8s-types/orchestrator-cache-helpers"
import {
  BUN_RUNTIME_IMAGE,
  GIT_TRANSPORT_CACHE,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "@akasha/k8s-types/orchestrator-cache-locations"
import { INIT_BARE_REPO_SCRIPT } from "../bare-repo-init/bare-repo-init.module.code.ts"
import {
  APP_NAME,
  NAMESPACE,
  RESOURCE_LABELS,
  SELECTOR_LABELS,
} from "../transport-naming/transport-naming.module.code.ts"

const GIT_ACCESS_TOKEN_REF = {
  secretName: "git-transport-secrets",
  secretKey: "GIT_ACCESS_TOKEN",
} as const

export function deploymentYaml(): string {
  const sourceCacheMounts = orchestratorCacheVolumeMounts()
  const ssdMount = { name: "data", mountPath: "/data/git/repositories" } as const

  const initSource = {
    ...orchestratorCacheInitContainer({
      gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
      location: GIT_TRANSPORT_CACHE,
    }),
    volumeMounts: [...sourceCacheMounts, { ...ssdMount, readOnly: true }],
  }

  const codeSync = {
    ...orchestratorCacheSyncSidecar({ gitAccessTokenRef: GIT_ACCESS_TOKEN_REF }),
    volumeMounts: [...sourceCacheMounts, { ...ssdMount, readOnly: true }],
  }

  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: APP_NAME,
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: {
        type: "Recreate",
      },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          labels: RESOURCE_LABELS,
        },
        spec: {
          securityContext: {
            fsGroup: 1000,
            fsGroupChangePolicy: "OnRootMismatch",
          },
          shareProcessNamespace: true,
          nodeSelector: workloadClassMemberSelector("build"),
          initContainers: [
            {
              name: "init-bare-repo",
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              command: ["sh", "-c", INIT_BARE_REPO_SCRIPT],
              env: [{ name: "HOME", value: "/tmp" }],
              envFrom: [{ secretRef: { name: "git-transport-secrets" } }],
              volumeMounts: [ssdMount],
              resources: {
                requests: { cpu: "200m", memory: "1Gi" },
                limits: { memory: "1Gi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
            initSource,
          ],
          containers: [
            {
              name: APP_NAME,
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: ORCHESTRATOR_CACHE_REPO_PATH,
              command: [
                "bun",
                "--watch",
                "akasha/git-transport/transport-serving/transport-serving.module.code.ts",
              ],
              ports: [
                {
                  name: "http",
                  containerPort: 3000,
                  protocol: "TCP",
                },
              ],
              env: [
                { name: "PORT", value: "3000" },
                { name: "GIT_TRANSPORT_PORT", value: "3000" },
                {
                  name: "GIT_TRANSPORT_CLONE_URL",
                  value: "http://git-transport.git.svc.cluster.local:3000",
                },
                { name: "HOME", value: "/tmp" },
              ],
              envFrom: [{ secretRef: { name: "git-transport-secrets" } }],
              volumeMounts: [...sourceCacheMounts, ssdMount],
              resources: {
                requests: { cpu: "1", memory: "3Gi" },
                limits: { cpu: "16", memory: "3Gi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              startupProbe: {
                httpGet: { path: "/health", port: "http" },
                periodSeconds: 5,
                failureThreshold: 12,
              },
              livenessProbe: {
                httpGet: { path: "/health", port: "http" },
                periodSeconds: 30,
              },
              readinessProbe: {
                httpGet: { path: "/health", port: "http" },
                periodSeconds: 10,
              },
              lifecycle: {
                preStop: {
                  exec: { command: ["sleep", "5"] },
                },
              },
            },
            codeSync,
          ],
          volumes: [
            ...orchestratorCacheVolumes(GIT_TRANSPORT_CACHE),
            {
              name: "data",
              persistentVolumeClaim: {
                claimName: "git-transport-data",
              },
            },
          ],
        },
      },
    },
  })
}
