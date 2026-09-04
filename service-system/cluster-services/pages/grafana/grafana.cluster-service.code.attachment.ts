import { readFileSync } from "node:fs"
import { join } from "node:path"
import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@akasha/k8s-types/hostnames"

const NAMESPACE = "grafana"
const APP_NAME = "grafana"
const INSTANCE_NAME = "grafana"
const COMPONENT = "visualization"
const PART_OF = "monitoring"
const MANAGED_BY = "bootstrap"
const GRAFANA_IMAGE = "grafana/grafana:11.2.2"
const INIT_CHOWN_IMAGE = "busybox:1.36"

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

const DASHBOARD_FILES = ["resources.json", "pods.json", "database.json"] as const

const DATASOURCES_YAML = [
  "apiVersion: 1",
  "datasources:",
  "  - name: Prometheus",
  "    type: prometheus",
  "    uid: prometheus",
  "    access: proxy",
  "    url: http://prometheus.prometheus.svc.cluster.local:9090",
  "    isDefault: true",
  "    editable: false",
  "  - name: Loki",
  "    type: loki",
  "    uid: loki",
  "    access: proxy",
  "    url: http://loki.loki.svc.cluster.local:3100",
  "    editable: false",
  "  - name: Postgres RO",
  "    type: postgres",
  "    uid: postgres",
  "    access: proxy",
  "    url: postgres-cnpg-ro.postgres.svc.cluster.local:5432",
  "    user: grafana_ro",
  "    jsonData:",
  "      database: postgres",
  "      sslmode: disable",
  "      postgresVersion: 1800",
  "    secureJsonData:",
  "      password: ${GRAFANA_DB_RO_PASSWORD}",
  "    editable: false",
  "",
].join("\n")

const DASHBOARDS_PROVIDER_YAML = [
  "apiVersion: 1",
  "providers:",
  "  - name: default",
  "    orgId: 1",
  '    folder: ""',
  "    type: file",
  "    disableDeletion: true",
  "    editable: false",
  "    options:",
  "      path: /var/lib/grafana/dashboards",
  "      foldersFromFilesStructure: false",
  "",
].join("\n")

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

function datasourcesConfigmapYaml(): string {
  return synthOne(NAMESPACE, "datasources-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "grafana-datasources",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    data: {
      "datasources.yaml": DATASOURCES_YAML,
      "dashboards.yaml": DASHBOARDS_PROVIDER_YAML,
    },
  })
}

function dashboardsConfigmapYaml(): string {
  const data: Record<string, string> = {}
  for (const file of DASHBOARD_FILES) {
    data[file] = readFileSync(join(import.meta.dir, "data", file), "utf8")
  }
  return synthOne(NAMESPACE, "dashboards-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "grafana-dashboards",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    data,
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "grafana",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          annotations: {
            "checksum/config": "placeholder",
            "checksum/grafana-secrets": "placeholder",
          },
          labels: RESOURCE_LABELS,
        },
        spec: {
          nodeSelector: capabilitySelector("database"),
          initContainers: [
            {
              name: "init-chown-data",
              image: INIT_CHOWN_IMAGE,
              command: ["sh", "-c", "chown -R 472:472 /var/lib/grafana"],
              volumeMounts: [{ name: "data", mountPath: "/var/lib/grafana" }],
              resources: {
                requests: { memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: {
                runAsNonRoot: false,
                runAsUser: 0,
              },
            },
          ],
          containers: [
            {
              name: "grafana",
              image: GRAFANA_IMAGE,
              env: [
                {
                  name: "GF_SECURITY_ADMIN_PASSWORD",
                  valueFrom: {
                    secretKeyRef: {
                      name: "grafana-secrets",
                      key: "GRAFANA_ADMIN_PASSWORD",
                    },
                  },
                },
                { name: "GF_AUTH_PROXY_ENABLED", value: "true" },
                { name: "GF_AUTH_PROXY_HEADER_NAME", value: "X-Forwarded-User" },
                { name: "GF_AUTH_PROXY_AUTO_SIGN_UP", value: "true" },
                { name: "GF_AUTH_ANONYMOUS_ENABLED", value: "false" },
                {
                  name: "GF_AUTH_PROXY_HEADERS",
                  value: "Email:X-Forwarded-Email Name:X-Forwarded-Name",
                },
                { name: "GF_USERS_AUTO_ASSIGN_ORG_ROLE", value: "Admin" },
                { name: "GF_AUTH_DISABLE_LOGIN_FORM", value: "true" },
                { name: "GF_SERVER_ROOT_URL", value: "https://grafana.alanwalton.com" },
                { name: "GF_PATHS_PROVISIONING", value: "/etc/grafana/provisioning" },
                {
                  name: "GRAFANA_DB_RO_PASSWORD",
                  valueFrom: {
                    secretKeyRef: {
                      name: "grafana-secrets",
                      key: "GRAFANA_DB_RO_PASSWORD",
                    },
                  },
                },
              ],
              ports: [{ name: "http", containerPort: 3000 }],
              resources: {
                requests: { cpu: "10m", memory: "96Mi" },
                limits: { memory: "96Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 472,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              livenessProbe: {
                httpGet: { path: "/api/health", port: 3000 },
                initialDelaySeconds: 30,
                periodSeconds: 10,
              },
              readinessProbe: {
                httpGet: { path: "/api/health", port: 3000 },
                initialDelaySeconds: 5,
                periodSeconds: 5,
              },
              volumeMounts: [
                { name: "data", mountPath: "/var/lib/grafana" },
                {
                  name: "datasources",
                  mountPath: "/etc/grafana/provisioning/datasources",
                  readOnly: true,
                },
                {
                  name: "dashboards-provider",
                  mountPath: "/etc/grafana/provisioning/dashboards",
                  readOnly: true,
                },
                {
                  name: "dashboards",
                  mountPath: "/var/lib/grafana/dashboards",
                  readOnly: true,
                },
                { name: "tmp", mountPath: "/var/tmp" },
                { name: "log", mountPath: "/var/log/grafana" },
              ],
            },
          ],
          volumes: [
            {
              name: "data",
              emptyDir: {},
            },
            {
              name: "datasources",
              configMap: {
                name: "grafana-datasources",
                items: [{ key: "datasources.yaml", path: "datasources.yaml" }],
              },
            },
            {
              name: "dashboards-provider",
              configMap: {
                name: "grafana-datasources",
                items: [{ key: "dashboards.yaml", path: "dashboards.yaml" }],
              },
            },
            {
              name: "dashboards",
              configMap: { name: "grafana-dashboards" },
            },
            { name: "tmp", emptyDir: { sizeLimit: "256Mi" } },
            { name: "log", emptyDir: { sizeLimit: "256Mi" } },
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
      name: "grafana",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          name: "http",
          port: 3000,
          targetPort: "http",
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "datasources-configmap", yaml: datasourcesConfigmapYaml() },
    { name: "dashboards-configmap", yaml: dashboardsConfigmapYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
