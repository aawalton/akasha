import { z } from "zod"
import { HudSchema, RevealedSheetSchema } from "../revealed-sheet/revealed-sheet.module.code.ts"

export const BeatSchema = z
  .object({
    id: z.string().min(1),
    turn: z.number(),
    type: z.enum(["narrative", "system"]),
    text: z.string().optional(),
    title: z.string().optional(),
    lines: z.array(z.string()).optional(),
  })
  .passthrough()
export type Beat = z.infer<typeof BeatSchema>

export const ChapterEntrySchema = z
  .object({
    number: z.number(),
    title: z.string(),
    floor: z.number(),
    startBeat: z.string().min(1).optional(),
    endBeat: z.string().min(1).optional(),
    status: z.enum(["open", "closed", "archived"]),
    heroBeat: z.string().optional(),
    sheetSnapshot: z.unknown().optional(),
  })
  .passthrough()
export type ChapterEntry = z.infer<typeof ChapterEntrySchema>

export const IllustrationSchema = z
  .object({
    anchor: z.string().min(1),
    src: z.string().min(1),
    alt: z.string().optional(),
    caption: z.string().optional(),
  })
  .passthrough()
export type Illustration = z.infer<typeof IllustrationSchema>

export const IllustrationsSchema = z.array(IllustrationSchema)
export type Illustrations = z.infer<typeof IllustrationsSchema>

export function parseIllustrations(raw: string): Illustrations {
  return IllustrationsSchema.parse(JSON.parse(raw))
}

export const TowerStateSchema = z
  .object({
    title: z.string().optional(),
    turn: z.number(),
    hud: HudSchema,
    sheet: RevealedSheetSchema,
    log: z.array(BeatSchema),
    chapters: z.array(ChapterEntrySchema),
  })
  .passthrough()
export type TowerState = z.infer<typeof TowerStateSchema>

export type TowerSession = TowerState

export function parseTowerState(raw: string): TowerState {
  return TowerStateSchema.parse(JSON.parse(raw))
}

export const TrimDocSchema = z
  .object({
    log: z.array(z.object({ id: z.string() }).passthrough()),
    chapters: z.array(z.unknown()),
  })
  .passthrough()
export type TrimDoc = z.infer<typeof TrimDocSchema>

export function parseTrimDoc(raw: string): TrimDoc {
  return TrimDocSchema.parse(JSON.parse(raw))
}
