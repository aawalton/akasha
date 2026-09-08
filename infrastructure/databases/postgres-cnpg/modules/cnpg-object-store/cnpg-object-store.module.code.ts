import { synthOne } from "@akasha/k8s-types/cdk8s-synth"

const NAMESPACE = "postgres"

const BACKUP_S3_SECRET = "postgres-cnpg-backup-s3"

export function objectStoreYaml(): string {
  return synthOne(NAMESPACE, "postgres-cnpg-objectstore", {
    apiVersion: "barmancloud.cnpg.io/v1",
    kind: "ObjectStore",
    metadata: {
      name: "postgres-cnpg-backup-store",
      namespace: NAMESPACE,
    },
    spec: {
      configuration: {
        destinationPath: "s3://postgres-cnpg-backups/",
        endpointURL: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
        s3Credentials: {
          accessKeyId: { name: BACKUP_S3_SECRET, key: "access_key" },
          secretAccessKey: { name: BACKUP_S3_SECRET, key: "secret_key" },
        },
        data: {
          compression: "gzip",
          immediateCheckpoint: true,
          jobs: 1,
          additionalCommandArgs: ["--min-chunk-size=5MB", "--max-archive-size=5GB"],
        },
        wal: { compression: "gzip" },
      },
      retentionPolicy: "7d",
    },
  })
}
