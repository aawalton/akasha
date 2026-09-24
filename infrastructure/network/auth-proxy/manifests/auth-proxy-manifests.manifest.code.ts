import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { resourcesOf } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import {
  HOSTNAME_KEY,
  workloadClassMemberSelector,
} from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { synthNamespaceDeploymentService } from "akasha/infrastructure/cluster/k8s-type/modules/manifest-composing/manifest-composing.module.code.ts"
import { authProxy as authProxyImage } from "akasha/infrastructure/container-image/dockerfile/built-image/auth-proxy/auth-proxy.built-image.ts"
import { refOf } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import { authProxyManifests as page } from "akasha/infrastructure/network/auth-proxy/manifests/auth-proxy-manifests.manifest.ts"
import { authProxy } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/auth-proxy/auth-proxy.service-cluster.ts"

const NAMESPACE = authProxy.namespace
const APP_NAME = authProxy.resourceName
const INSTANCE_NAME = authProxy.resourceName
const COMPONENT = "auth"
const PART_OF = authProxy.slug
const MANAGED_BY = "bootstrap"
const PORT = authProxy.containerPort

const NAMESPACE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

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

const ROUTE_MAP_VALUE = JSON.stringify({
  "grafana.alanwalton.com": "http://grafana.grafana.svc.cluster.local:3000",
  "git.alanwalton.com": "http://git-transport.git.svc.cluster.local:3000",
})

const ALAN_CONTRIBUTOR =
  "contributor-9bc4d42501098ce9fad8a73ad03e2ef5d1e89b4a1fac8426b100f7c4d7e5e3d4"

const ADMITTED_VALUE = JSON.stringify({
  [ALAN_CONTRIBUTOR]: { sub: "alan", email: "aawalton@gmail.com", name: "alan" },
})

const SECRETS_NAME = `${APP_NAME}-secrets`

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: APP_NAME,
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: authProxy.replicas,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: {
          maxSurge: 1,
          maxUnavailable: 0,
        },
      },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          labels: RESOURCE_LABELS,
        },
        spec: {
          nodeSelector: workloadClassMemberSelector("control"),
          topologySpreadConstraints: [
            {
              maxSkew: 1,
              topologyKey: HOSTNAME_KEY,
              whenUnsatisfiable: "DoNotSchedule",
              labelSelector: { matchLabels: SELECTOR_LABELS },
            },
          ],
          containers: [
            {
              name: APP_NAME,
              image: refOf(authProxyImage),
              imagePullPolicy: "Always",
              ports: [
                {
                  containerPort: PORT,
                  protocol: "TCP",
                },
              ],
              env: [
                { name: "PORT", value: String(PORT) },
                { name: "ROUTE_MAP", value: ROUTE_MAP_VALUE },
                { name: "ADMITTED", value: ADMITTED_VALUE },
              ],
              envFrom: [{ secretRef: { name: SECRETS_NAME } }],
              volumeMounts: [{ name: "tmp", mountPath: "/tmp" }],
              resources: resourcesOf(page),
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              lifecycle: {
                preStop: {
                  exec: { command: ["sleep", "5"] },
                },
              },
              startupProbe: {
                httpGet: { path: "/healthz", port: PORT },
                periodSeconds: 5,
                failureThreshold: 12,
              },
              livenessProbe: {
                httpGet: { path: "/healthz", port: PORT },
                periodSeconds: 30,
              },
              readinessProbe: {
                httpGet: { path: "/healthz", port: PORT },
                periodSeconds: 10,
              },
            },
          ],
          volumes: [
            {
              name: "tmp",
              emptyDir: { sizeLimit: "64Mi" },
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
      name: APP_NAME,
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          port: PORT,
          targetPort: PORT,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthNamespaceDeploymentService(NAMESPACE, NAMESPACE_LABELS, deploymentYaml, serviceYaml)
}
