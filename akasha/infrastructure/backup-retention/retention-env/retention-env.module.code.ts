import { z } from "zod"

export const envSchema = z.object({
  BARMAN_ENDPOINT_URL: z.string().default("http://s3-gateway.seaweedfs.svc.cluster.local:8333"),
  BARMAN_SOURCE_URL: z.string().default("s3://postgres-cnpg-backups/"),
  BARMAN_SERVER_NAME: z.string().default("postgres-cnpg"),
  DRY_RUN: z.string().optional(),
})

export const longtailEnvSchema = z.object({
  BARMAN_ENDPOINT_URL: z.string().default("http://s3-gateway.seaweedfs.svc.cluster.local:8333"),
  LONGTAIL_BUCKET: z.string().default("postgres-cnpg-backups"),
  BARMAN_SERVER_NAME: z.string().default("postgres-cnpg"),
  BACKUP_MOUNT: z.string().default("/backup"),
  LONGTAIL_BUDGET_BYTES: z.coerce.number().default(500 * 1024 ** 3),
  LONGTAIL_ALERT_THRESHOLD: z.coerce.number().default(0.8),
  MONTHLY_KEEP_COUNT: z.coerce.number().default(12),
  DRY_RUN: z.string().optional(),
})
