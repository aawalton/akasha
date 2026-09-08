import { synthOne } from "@akasha/k8s-types/cdk8s-synth"

const NAMESPACE = "postgres"

export function scheduledBackupYaml(): string {
  return synthOne(NAMESPACE, "postgres-cnpg-scheduledbackup", {
    apiVersion: "postgresql.cnpg.io/v1",
    kind: "ScheduledBackup",
    metadata: {
      name: "postgres-cnpg-daily",
      namespace: NAMESPACE,
    },
    spec: {
      cluster: { name: "postgres-cnpg" },
      schedule: "0 0 3 * * *",
      method: "plugin",
      pluginConfiguration: { name: "barman-cloud.cloudnative-pg.io" },
      backupOwnerReference: "self",
      immediate: false,
    },
  })
}
