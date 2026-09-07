import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"

const NAMESPACE = "postgres"

const CNPG_IMAGE =
  "registry.registry.svc.cluster.local:5000/cluster/postgres-cnpg:18-ts2.24-pgcron-pgnet-wal2json-pgjsonschema-r1"

const SOURCE = "postgres-legacy"

export function cnpgClusterYaml(): string {
  return synthOne(NAMESPACE, "postgres-cnpg-cluster", {
    apiVersion: "postgresql.cnpg.io/v1",
    kind: "Cluster",
    metadata: {
      name: "postgres-cnpg",
      namespace: NAMESPACE,
    },
    spec: {
      instances: 2,
      imageName: CNPG_IMAGE,
      imagePullPolicy: "IfNotPresent",

      enableSuperuserAccess: true,
      superuserSecret: { name: "postgres-cnpg-superuser" },

      managed: {
        roles: [
          {
            name: "grafana_ro",
            ensure: "present",
            login: true,
            superuser: false,
            createdb: false,
            createrole: false,
            inRoles: ["pg_monitor"],
            passwordSecret: { name: "grafana-ro-password" },
          },
          {
            name: "agent_adhoc",
            ensure: "present",
            login: true,
            superuser: false,
            createdb: false,
            createrole: false,
            inherit: true,
            bypassrls: true,
            inRoles: ["pg_read_all_data"],
            passwordSecret: { name: "agent-adhoc-password" },
          },
        ],
      },

      bootstrap: { pg_basebackup: { source: SOURCE } },
      replica: { enabled: false, source: SOURCE },
      externalClusters: [
        {
          name: SOURCE,
          connectionParameters: {
            host: "postgres.postgres.svc.cluster.local",
            port: "5432",
            user: "postgres",
            dbname: "postgres",
            sslmode: "disable",
          },
          password: { name: "postgres-cnpg-superuser", key: "password" },
        },
      ],

      plugins: [
        {
          name: "barman-cloud.cloudnative-pg.io",
          isWALArchiver: true,
          parameters: { barmanObjectName: "postgres-cnpg-backup-store" },
        },
      ],

      postgresql: {
        shared_preload_libraries: ["timescaledb", "pg_cron", "pg_net", "pg_stat_statements"],
        parameters: {
          shared_buffers: "8GB",
          effective_cache_size: "18GB",
          maintenance_work_mem: "2GB",
          work_mem: "32MB",
          max_connections: "500",
          max_wal_senders: "20",
          max_replication_slots: "32",
          max_slot_wal_keep_size: "10GB",
          "cron.database_name": "postgres",
          "pg_stat_statements.track": "all",
          idle_in_transaction_session_timeout: "120s",
          jit: "off",
        },
      },

      storage: { size: "100Gi", storageClass: "" },
      walStorage: { size: "20Gi", storageClass: "" },

      resources: {
        requests: { memory: "20Gi", cpu: "4" },
        limits: { memory: "20Gi", cpu: "4" },
      },

      switchoverDelay: 300,

      affinity: {
        nodeSelector: workloadClassMemberSelector("database"),
        enablePodAntiAffinity: true,
        podAntiAffinityType: "required",
      },
    },
  })
}
