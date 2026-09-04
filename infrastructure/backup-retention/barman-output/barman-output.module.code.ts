import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import type { KeepState } from "../keep-decision/keep-decision.module.code.ts"

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
