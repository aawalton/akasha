import { SystemWindowSchema } from "akasha/story/engine/core/modules/system-window-schema/system-window-schema.module.code.ts"
import { PoolChangeSchema } from "akasha/story/engine/core/modules/turn-package-schema/turn-package-schema.module.code.ts"
import { z } from "zod"

const BeatIdSchema = z.union([z.string(), z.number()])

export const SystemMechanicsSchema = z
  .object({
    poolChanges: z.array(PoolChangeSchema).min(1),
  })
  .strict()
type SystemMechanics = z.infer<typeof SystemMechanicsSchema>

const NarrativeBeatSchema = z.object({
  type: z.literal("narrative"),
  id: BeatIdSchema.optional(),
  turn: z.number().optional(),
  text: z.string(),
})
type NarrativeBeat = z.infer<typeof NarrativeBeatSchema>

const SystemBeatSchema = z.object({
  type: z.literal("system"),
  id: BeatIdSchema.optional(),
  turn: z.number().optional(),
  title: z.string().optional(),
  lines: z.array(z.string()).optional(),
  mechanics: SystemMechanicsSchema.optional(),
  window: SystemWindowSchema.optional(),
})
type SystemBeat = z.infer<typeof SystemBeatSchema>

export function systemBeatCarriesVoiceText(beat: SystemBeat): boolean {
  const hasTitle = beat.title !== undefined && beat.title.trim() !== ""
  const hasLine = (beat.lines ?? []).some((line) => line.trim() !== "")
  return hasTitle || hasLine
}

export function renderSystemMechanics(mechanics: SystemMechanics): { lines: readonly string[] } {
  const lines = mechanics.poolChanges.map(({ pool, delta, newTotal }) => {
    const sign = delta >= 0 ? "+" : ""
    return `${pool} ${sign}${delta} → ${newTotal}`
  })
  return { lines }
}

function assertRenderableContent(
  beat: NarrativeBeat | SystemBeat,
  ctx: z.RefinementCtx
): undefined {
  if (beat.type === "narrative" && beat.text.trim() === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["text"],
      message: "narrative beat must carry non-empty text",
    })
  }
  if (beat.type === "system") {
    const hasMechanics = beat.mechanics !== undefined
    const hasVoiceText = systemBeatCarriesVoiceText(beat)
    const hasWindow = beat.window !== undefined
    const channels = (hasMechanics ? 1 : 0) + (hasVoiceText ? 1 : 0) + (hasWindow ? 1 : 0)
    if (channels > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "system beat must carry EXACTLY ONE of structured mechanics, a title/line, or a typed window — not more than one",
      })
    } else if (channels === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "system beat must carry structured mechanics, a non-empty title or line, or a typed window",
      })
    }
  }
}

export const BeatSchema = z
  .discriminatedUnion("type", [NarrativeBeatSchema, SystemBeatSchema])
  .superRefine(assertRenderableContent)
export type Beat = z.infer<typeof BeatSchema>
