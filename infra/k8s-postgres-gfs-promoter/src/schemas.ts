import { requireMatchPositional } from "../../../shared/utils-narrow/src/require-match-positional"
import { z } from "zod"
import type { KeepState } from "./pure/types"

export const backupListingSchema = z
  .object({
    backups_list: z.array(
      z
        .object({
          backup_id: z.string().min(1),
          begin_time_iso: z.string().min(1),
          status: z.string().min(1),
        })
        .passthrough()
    ),
  })
  .passthrough()

export type BackupListing = z.infer<typeof backupListingSchema>

const keepStateSchema = z.enum(["nokeep", "standalone", "full"])

export function parseKeepStatus(stdout: string): KeepState {
  const [state] = requireMatchPositional(
    /Keep:\s*(\S+)/,
    z.tuple([keepStateSchema]),
    stdout,
    "keep-status output"
  )
  return state
}

export const envSchema = z.object({
  BARMAN_ENDPOINT_URL: z.string().default("http://s3-gateway.seaweedfs.svc.cluster.local:8333"),
  BARMAN_SOURCE_URL: z.string().default("s3://postgres-cnpg-backups/"),
  BARMAN_SERVER_NAME: z.string().default("postgres-cnpg"),
  DRY_RUN: z.string().optional(),
})

export type PromoterEnv = z.infer<typeof envSchema>

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

export type LongtailEnv = z.infer<typeof longtailEnvSchema>
