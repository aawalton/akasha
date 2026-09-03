import type { PersistedPagesSnapshot } from "@akasha/pages-ui-store/collection/persistence"
import { PageRowSchema } from "@akasha/pages-ui-store/realtime/payload-translator"
import { ShapeResumeStateSchema } from "@akasha/pages-ui-store/realtime/shape-meta"
import { z } from "zod"

export const PersistedPagesSnapshotSchema = z
  .object({
    version: z.literal(1),
    rows: z.array(PageRowSchema),
    resume: z.array(z.tuple([z.string(), ShapeResumeStateSchema])),
  })
  .strict()

export const EMPTY_PAGES_SNAPSHOT: PersistedPagesSnapshot = { version: 1, rows: [], resume: [] }

export function parsePagesSnapshot(raw: string): PersistedPagesSnapshot | null {
  try {
    const parsed = PersistedPagesSnapshotSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function serializePagesSnapshot(snapshot: PersistedPagesSnapshot): string {
  return JSON.stringify(snapshot)
}
