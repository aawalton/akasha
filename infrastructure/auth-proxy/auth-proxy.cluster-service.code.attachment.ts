import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY, workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"

const NAMESPACE = "auth-proxy"
const APP_NAME = "auth-proxy"
const INSTANCE_NAME = "auth-proxy"
const COMPONENT = "auth"
const PART_OF = "auth-proxy"
const MANAGED_BY = "bootstrap"
const PORT = 3080

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
  "supabase.alanwalton.com": "http://supabase-studio.supabase-studio.svc.cluster.local:3000",
})

type PathRoute = {
  host: string
  prefix: string
  target: string
  stripPrefix: boolean
  websocket?: boolean
  stub?: { body: string }
}

const PATH_ROUTES: readonly PathRoute[] = [
  {
    host: "supabase.alanwalton.com",
    prefix: "/rest/v1",
    target: "http://postgrest.postgrest.svc.cluster.local:3000",
    stripPrefix: true,
  },
  {
    host: "supabase.alanwalton.com",
    prefix: "/auth/v1",
    target: "http://gotrue.gotrue.svc.cluster.local:9999",
    stripPrefix: true,
  },
  {
    host: "supabase.alanwalton.com",
    prefix: "/realtime/v1",
    target: "ws://realtime.supabase-realtime.svc.cluster.local:4000/socket",
    stripPrefix: true,
    websocket: true,
  },
  {
    host: "supabase.alanwalton.com",
    prefix: "/favicon",
    target: "http://supabase-studio.supabase-studio.svc.cluster.local:3000",
    stripPrefix: false,
  },
  {
    host: "supabase.alanwalton.com",
    prefix: "/api/platform/notifications",
    target: "stub://",
    stripPrefix: false,
    stub: { body: "[]" },
  },
  {
    host: "supabase.alanwalton.com",
    prefix: "/api/platform/functions",
    target: "stub://",
    stripPrefix: false,
    stub: { body: "[]" },
  },
  {
    host: "auth-proxy.auth-proxy.svc.cluster.local:3080",
    prefix: "/rest/v1",
    target: "http://postgrest.postgrest.svc.cluster.local:3000",
    stripPrefix: true,
  },
  {
    host: "auth-proxy.auth-proxy.svc.cluster.local:3080",
    prefix: "/auth/v1",
    target: "http://gotrue.gotrue.svc.cluster.local:9999",
    stripPrefix: true,
  },
  {
    host: "auth-proxy.auth-proxy.svc.cluster.local:3080",
    prefix: "/realtime/v1",
    target: "ws://realtime.supabase-realtime.svc.cluster.local:4000/socket",
    stripPrefix: true,
    websocket: true,
  },
]

const PATH_ROUTES_VALUE = JSON.stringify(PATH_ROUTES)

const CORS_ALLOWED_ORIGINS_VALUE = [
  "https://alanwalton.com",
  "capacitor://localhost",
  "https://dev.alanwalton.com",
  "https://studio.alanwalton.com",
  "https://atlas.alanwalton.com",
  "http://localhost:3010",
  "https://tempereso.com",
  "https://www.tempereso.com",
  "https://dev.tempereso.com",
  "https://archiveofworlds.app",
  "https://www.archiveofworlds.app",
  "https://dev.archiveofworlds.app",
  "https://smilingjenny.me",
].join(",")

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
      replicas: 2,
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
              image: "MUST_BE_SET_BY_DEPLOY",
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
                { name: "PATH_ROUTES", value: PATH_ROUTES_VALUE },
                { name: "SIGN_IN_URL", value: "https://alanwalton.com/sign-in" },
                {
                  name: "SUPABASE_JWKS_URL",
                  value: "http://gotrue.gotrue.svc.cluster.local:9999/.well-known/jwks.json",
                },
                {
                  name: "SUPABASE_JWT_ISSUER",
                  value: "https://supabase.alanwalton.com/auth/v1",
                },
                { name: "SUPABASE_JWT_AUDIENCE", value: "authenticated" },
                { name: "CORS_ALLOWED_ORIGINS", value: CORS_ALLOWED_ORIGINS_VALUE },
                {
                  name: "CORS_ALLOWED_ORIGIN_PATTERNS",
                  value: "^http://localhost:3[0-6][0-9]{2}$",
                },
                { name: "CORS_PATH_PREFIXES", value: "/auth/v1" },
              ],
              volumeMounts: [{ name: "tmp", mountPath: "/var/tmp" }],
              resources: {
                requests: { cpu: "50m", memory: "2Gi" },
                limits: { cpu: "500m", memory: "2Gi" },
              },
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
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
