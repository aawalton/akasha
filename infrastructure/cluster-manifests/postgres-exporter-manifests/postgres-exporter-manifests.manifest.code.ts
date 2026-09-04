import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  CNPG_POSTGRES_PRIMARY_LABELS,
  colocationAffinityPreferred,
} from "@akasha/k8s-types/hostnames"
import {
  NAMESPACE,
  POSTGRES_EXPORTER_IMAGE,
  POSTGRES_EXPORTER_LABELS,
  POSTGRES_EXPORTER_SELECTOR_LABELS,
} from "../prometheus-constants/prometheus-constants.module.code.ts"
import { QUERY_PERF_QUERIES_YAML } from "../query-perf-queries/query-perf-queries.module.code.ts"

const POSTGRES_EXPORTER_QUERIES_YAML = `pg_schema_size:
  query: |
    SELECT
      n.nspname AS schema,
      COALESCE(SUM(pg_total_relation_size(c.oid)), 0) AS bytes
    FROM pg_namespace n
    LEFT JOIN pg_class c ON c.relnamespace = n.oid AND c.relkind IN ('r','m','i')
    WHERE n.nspname NOT LIKE 'pg_toast%'
      AND n.nspname NOT LIKE 'pg_temp%'
    GROUP BY n.nspname
  metrics:
    - schema:
        usage: "LABEL"
        description: "Schema name"
    - bytes:
        usage: "GAUGE"
        description: "Total size of schema in bytes"
  cache_seconds: 300

pg_top_tables:
  query: |
    SELECT
      n.nspname AS schema,
      c.relname AS table,
      pg_total_relation_size(c.oid) AS bytes
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relkind = 'r'
      AND n.nspname NOT LIKE 'pg_toast%'
      AND n.nspname NOT LIKE 'pg_temp%'
    ORDER BY pg_total_relation_size(c.oid) DESC
    LIMIT 20
  metrics:
    - schema:
        usage: "LABEL"
        description: "Schema name"
    - table:
        usage: "LABEL"
        description: "Table name"
    - bytes:
        usage: "GAUGE"
        description: "Total size of table in bytes"
  cache_seconds: 300

pg_schema_count:
  query: |
    SELECT
      CASE
        WHEN n.nspname IN ('pg_catalog','information_schema','_supabase','cron','graphql','graphql_public','vault','pgsodium','_analytics','_realtime')
          OR n.nspname LIKE 'pg_%' THEN 'system'
        ELSE 'core'
      END AS category,
      COUNT(*) AS total
    FROM pg_namespace n
    WHERE n.nspname NOT LIKE 'pg_toast%'
      AND n.nspname NOT LIKE 'pg_temp%'
    GROUP BY 1
  metrics:
    - category:
        usage: "LABEL"
        description: "Schema category"
    - total:
        usage: "GAUGE"
        description: "Number of schemas in category"
  cache_seconds: 300

pg_txid:
  query: |
    SELECT
      datname,
      age(datfrozenxid)::float8 AS age,
      (100.0 * age(datfrozenxid) / 2.0e9)::float8 AS pct_to_wraparound
    FROM pg_database
    WHERE datallowconn
  metrics:
    - datname:
        usage: "LABEL"
        description: "Database name"
    - age:
        usage: "GAUGE"
        description: "Transactions since last freeze (age of datfrozenxid; max table age in the db)"
    - pct_to_wraparound:
        usage: "GAUGE"
        description: "Percent of the 2-billion transaction-ID wraparound horizon consumed"
  cache_seconds: 60

pg_blocked:
  query: |
    SELECT count(*)::float8 AS backends
    FROM pg_stat_activity
    WHERE wait_event_type = 'Lock'
  metrics:
    - backends:
        usage: "GAUGE"
        description: "Backends currently blocked waiting to acquire a lock"
  cache_seconds: 30

pg_checkpointer:
  query: |
    SELECT
      num_timed::float8 AS num_timed,
      num_requested::float8 AS num_requested,
      buffers_written::float8 AS buffers_written,
      write_time::float8 AS write_time_ms,
      sync_time::float8 AS sync_time_ms
    FROM pg_stat_checkpointer
  metrics:
    - num_timed:
        usage: "COUNTER"
        description: "Scheduled checkpoints begun"
    - num_requested:
        usage: "COUNTER"
        description: "Requested checkpoints begun"
    - buffers_written:
        usage: "COUNTER"
        description: "Buffers written during checkpoints"
    - write_time_ms:
        usage: "COUNTER"
        description: "Total checkpoint write time (ms)"
    - sync_time_ms:
        usage: "COUNTER"
        description: "Total checkpoint sync time (ms)"
  cache_seconds: 60

${QUERY_PERF_QUERIES_YAML}`

const POSTGRES_EXPORTER_WRAPPER = `export DATA_SOURCE_NAME="$DATABASE_URL"
exec /bin/postgres_exporter "$@"
`

export function postgresExporterQueriesConfigmapYaml(): string {
  return synthOne(NAMESPACE, "postgres-exporter-queries-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "postgres-exporter-queries",
      namespace: NAMESPACE,
      labels: POSTGRES_EXPORTER_LABELS,
    },
    data: {
      "queries.yaml": POSTGRES_EXPORTER_QUERIES_YAML,
    },
  })
}

export function postgresExporterDeploymentYaml(): string {
  return synthOne(NAMESPACE, "postgres-exporter-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "postgres-exporter",
      namespace: NAMESPACE,
      labels: POSTGRES_EXPORTER_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: POSTGRES_EXPORTER_SELECTOR_LABELS },
      template: {
        metadata: { labels: POSTGRES_EXPORTER_LABELS },
        spec: {
          affinity: colocationAffinityPreferred(CNPG_POSTGRES_PRIMARY_LABELS, ["postgres"]),
          containers: [
            {
              name: "postgres-exporter",
              image: POSTGRES_EXPORTER_IMAGE,
              command: ["/bin/sh", "-c", POSTGRES_EXPORTER_WRAPPER, "--"],
              args: [
                "--no-collector.stat_bgwriter",
                "--extend.query-path=/etc/postgres-exporter/queries.yaml",
              ],
              env: [
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: { name: "prometheus-secrets", key: "DATABASE_URL" },
                  },
                },
              ],
              volumeMounts: [
                {
                  name: "queries",
                  mountPath: "/etc/postgres-exporter",
                  readOnly: true,
                },
              ],
              ports: [{ name: "metrics", containerPort: 9187 }],
              resources: {
                requests: { cpu: "20m", memory: "80Mi" },
                limits: { memory: "80Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65534,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              livenessProbe: {
                httpGet: { path: "/", port: 9187 },
                initialDelaySeconds: 10,
                periodSeconds: 10,
              },
              readinessProbe: {
                httpGet: { path: "/", port: 9187 },
                initialDelaySeconds: 5,
                periodSeconds: 5,
              },
            },
          ],
          volumes: [
            {
              name: "queries",
              configMap: {
                name: "postgres-exporter-queries",
                items: [{ key: "queries.yaml", path: "queries.yaml" }],
              },
            },
          ],
        },
      },
    },
  })
}

export function postgresExporterServiceYaml(): string {
  return synthOne(NAMESPACE, "postgres-exporter-service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "postgres-exporter",
      namespace: NAMESPACE,
      labels: POSTGRES_EXPORTER_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: POSTGRES_EXPORTER_SELECTOR_LABELS,
      ports: [
        {
          name: "metrics",
          port: 9187,
          targetPort: "metrics",
          protocol: "TCP",
        },
      ],
    },
  })
}
