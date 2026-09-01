import { z } from "zod"
import { SystemWindowSchema } from "../system-window-schema/system-window-schema.module.code.ts"
import { PoolChangeSchema } from "../turn-package-schema/turn-package-schema.module.code.ts"

const BeatIdSchema = z.union([z.string(), z.number()])

export const SystemMechanicsSchema = z
  .object({
    poolChanges: z.array(PoolChangeSchema).min(1),
  })
  .strict()
export type SystemMechanics = z.infer<typeof SystemMechanicsSchema>

export const NarrativeBeatSchema = z.object({
  type: z.literal("narrative"),
  id: BeatIdSchema.optional(),
  turn: z.number().optional(),
  text: z.string(),
})
export type NarrativeBeat = z.infer<typeof NarrativeBeatSchema>

export const SystemBeatSchema = z.object({
  type: z.literal("system"),
  id: BeatIdSchema.optional(),
  turn: z.number().optional(),
  title: z.string().optional(),
  lines: z.array(z.string()).optional(),
  mechanics: SystemMechanicsSchema.optional(),
  window: SystemWindowSchema.optional(),
})
export type SystemBeat = z.infer<typeof SystemBeatSchema>

export function systemBeatCarriesVoiceText(beat: SystemBeat): boolean {
  const hasTitle = beat.title !== undefined && beat.title.trim() !== ""
  const hasLine = (beat.lines ?? []).some((line) => line.trim() !== "")
  return hasTitle || hasLine
}

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep)
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    return Object.fromEntries(entries.map(([k, v]) => [k, sortKeysDeep(v)]))
  }
  return value
}

export function canonicalBeatKey(beat: unknown): string {
  return JSON.stringify(sortKeysDeep(beat))
}

export function storedBeatGrandfatherKeys(storedLog: readonly unknown[]): ReadonlySet<string> {
  return new Set(storedLog.map(canonicalBeatKey))
}

export function beatIsGrandfathered(beat: unknown, grandfatherKeys: ReadonlySet<string>): boolean {
  return grandfatherKeys.has(canonicalBeatKey(beat))
}

const BeatIdentitySchema = z.object({ id: BeatIdSchema.optional() }).passthrough()

export function beatIdentityKey(beat: unknown): string {
  const parsed = BeatIdentitySchema.safeParse(beat)
  if (parsed.success && parsed.data.id !== undefined) return `id:${String(parsed.data.id)}`
  return `content:${canonicalBeatKey(beat)}`
}

export function droppedBeats(
  storedLog: readonly unknown[],
  incomingLog: readonly unknown[]
): readonly unknown[] {
  const incomingKeys = new Set(incomingLog.map(beatIdentityKey))
  return storedLog.filter((beat) => !incomingKeys.has(beatIdentityKey(beat)))
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

export const WriteBeatSchema = BeatSchema.superRefine((beat, ctx) => {
  if (beat.turn === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["turn"],
      message: "log beat must carry a turn stamp",
    })
  }
})
export type WriteBeat = z.infer<typeof WriteBeatSchema>
