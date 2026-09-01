import { z } from "zod"

export const TurnOptionSchema = z
  .object({
    label: z.string(),
    description: z.string().optional(),
    effect: z.string().optional(),
    value: z.string().optional(),
  })
  .strict()
export type TurnOption = z.infer<typeof TurnOptionSchema>

export const TurnOptionsSchema = z.array(TurnOptionSchema)
export type TurnOptions = z.infer<typeof TurnOptionsSchema>

export const TurnSheetSnapshotSchema = z.record(z.string(), z.unknown())
export type TurnSheetSnapshot = z.infer<typeof TurnSheetSnapshotSchema>

export const TurnStatusSchema = z.enum(["draft", "complete", "published"])
export type TurnStatus = z.infer<typeof TurnStatusSchema>

export function isPublishedTurnStatus(status: string | null | undefined): boolean {
  return status !== "draft"
}

export const BankedRemainderSchema = z.string()
export function parseBankedRemainder(value: unknown): string | null {
  const parsed = BankedRemainderSchema.safeParse(value)
  return parsed.success && parsed.data.length > 0 ? parsed.data : null
}
