import { z } from "zod"

export const POSITION_WRITE_EVENT = "position-write"

export const PositionWriteDetailSchema = z
  .object({
    pageId: z.string().min(1),
    progress: z.number(),
  })
  .strict()

export type PositionWriteDetail = z.infer<typeof PositionWriteDetailSchema>

export function emitPositionWrite(pageId: string, progress: number): undefined {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(POSITION_WRITE_EVENT, { detail: { pageId, progress } }))
}

export function parsePositionWriteDetail(value: unknown): PositionWriteDetail | null {
  const result = PositionWriteDetailSchema.safeParse(value)
  return result.success ? result.data : null
}
