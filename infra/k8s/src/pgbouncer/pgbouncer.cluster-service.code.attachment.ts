import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  CNPG_POSTGRES_PRIMARY_LABELS,
  colocationAffinityPreferred,
} from "@akasha/k8s-types/hostnames"
import { kubernetesLabels, selectorOf } from "@akasha/k8s-types/labels"

const NAMESPACE = "pgbouncer"
const APP_NAME = "pgbouncer"
const INSTANCE_NAME = "pgbouncer"
const COMPONENT = "database-proxy"
const PART_OF = "pgbouncer"
const MANAGED_BY = "bootstrap"
const PGBOUNCER_IMAGE = "edoburu/pgbouncer:v1.25.1-p0"

const NAMESPACE_LABELS = kubernetesLabels({
  name: APP_NAME,
  managedBy: MANAGED_BY,
})

const RESOURCE_LABELS = kubernetesLabels({
  name: APP_NAME,
  instance: INSTANCE_NAME,
  component: COMPONENT,
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

const SELECTOR_LABELS = selectorOf(RESOURCE_LABELS, "name-instance")

const PGBOUNCER_INI = [
  "[databases]",
  "* = host=postgres.postgres.svc.cluster.local port=5432",
  "",
  "[pgbouncer]",
  "listen_addr = 0.0.0.0",
  "listen_port = 5432",
  "pool_mode = transaction",
  "default_pool_size = 50",
  "max_client_conn = 200",
  "track_extra_parameters = search_path",
  "auth_type = scram-sha-256",
  "auth_file = /etc/pgbouncer/userlist.txt",
  "client_tls_sslmode = require",
  "client_tls_key_file = /tls/tls.key",
  "client_tls_cert_file = /tls/tls.crt",
  "log_connections = 1",
  "log_disconnections = 1",
  "stats_period = 60",
  "admin_users = pgbouncer_admin",
  "stats_users = pgbouncer_stats",
  "ignore_startup_parameters = extra_float_digits",
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

function configmapYaml(): string {
  return synthOne(NAMESPACE, "configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "pgbouncer-config",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    data: {
      "pgbouncer.ini": PGBOUNCER_INI,
    },
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "pgbouncer",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      revisionHistoryLimit: 3,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: {
          maxUnavailable: 0,
          maxSurge: 1,
        },
      },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: { labels: RESOURCE_LABELS },
        spec: {
          affinity: colocationAffinityPreferred(CNPG_POSTGRES_PRIMARY_LABELS, ["postgres"]),
          securityContext: {
            runAsUser: 70,
          },
          containers: [
            {
              name: "pgbouncer",
              image: PGBOUNCER_IMAGE,
              ports: [{ containerPort: 5432, protocol: "TCP" }],
              volumeMounts: [
                {
                  name: "config",
                  mountPath: "/etc/pgbouncer/pgbouncer.ini",
                  subPath: "pgbouncer.ini",
                  readOnly: true,
                },
                { name: "tls", mountPath: "/tls", readOnly: true },
                {
                  name: "auth",
                  mountPath: "/etc/pgbouncer/userlist.txt",
                  subPath: "userlist.txt",
                  readOnly: true,
                },
                { name: "tmp", mountPath: "/tmp" },
                { name: "run", mountPath: "/run" },
              ],
              readinessProbe: {
                tcpSocket: { port: 5432 },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
              livenessProbe: {
                tcpSocket: { port: 5432 },
                initialDelaySeconds: 10,
                periodSeconds: 30,
              },
              resources: {
                requests: { cpu: "100m", memory: "256Mi" },
                limits: { cpu: "500m", memory: "256Mi" },
              },
              lifecycle: {
                preStop: {
                  exec: { command: ["sleep", "5"] },
                },
              },
              securityContext: {
                runAsNonRoot: true,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
          volumes: [
            { name: "config", configMap: { name: "pgbouncer-config" } },
            { name: "tls", secret: { secretName: "pgbouncer-tls" } },
            { name: "auth", secret: { secretName: "pgbouncer-auth" } },
            { name: "tmp", emptyDir: {} },
            { name: "run", emptyDir: {} },
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
      name: "pgbouncer",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          port: 5432,
          targetPort: 5432,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "configmap", yaml: configmapYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
