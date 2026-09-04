import type { Outcome } from "@akasha/command-system/gated-write"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { akashaSeatSlugOf } from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import {
  removeAkashaSeatPage,
  writeAkashaSeatPage,
} from "../seat-page-akasha/seat-page-akasha.module.code.ts"
import type { Stated } from "../seat-stated/seat-stated.module.code.ts"

export async function writeSeatPage(
  stated: Stated,
  seatName: string,
  parentName: string | null = null
): Promise<Outcome> {
  return await writeAkashaSeatPage(stated, seatName, resolveRoots(), parentName)
}

export async function removeSeatPage(agent: string, stopReason: string): Promise<Outcome> {
  const seatName = akashaSeatSlugOf(agent)
  if (seatName === null) return { kind: "unchanged" }
  try {
    return await removeAkashaSeatPage(seatName, resolveRoots(), stopReason)
  } catch (thrown) {
    const detail = thrown instanceof Error ? thrown.message : String(thrown)
    process.stderr.write(`${seatName}'s page in akasha stands: ${detail}\n`)
    return { kind: "refused", detail }
  }
}
