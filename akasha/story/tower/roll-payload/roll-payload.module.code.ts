import type { ActionInput, ActionResult } from "@akasha/story-tower-engine/combat-types"
import { z } from "zod"

export const TowerRollPayloadSchema = z
  .object({
    turn: z.number(),
    action: z.string().optional(),
    result: z.string(),
    shown: z.boolean().default(false),
    seed: z.number().nullish(),
    die: z.string().nullish(),
    roll: z.union([z.number(), z.string(), z.record(z.string(), z.unknown())]).nullish(),
    intent: z.union([z.number(), z.string()]).nullish(),
    DC: z.number().nullish(),
    score: z.number().nullish(),
    margin: z.number().nullish(),
    attr: z.string().nullish(),
    attrVal: z.number().nullish(),
    mode: z.string().nullish(),
    attackPower: z.number().nullish(),
    defense: z.number().nullish(),
    baseDamage: z.number().nullish(),
    gate: z.union([z.number(), z.string()]).nullish(),
    gatedBase: z.number().nullish(),
    affinityBias: z.number().nullish(),
    skillBonus: z.number().nullish(),
    damage: z.number().nullish(),
    enemyHP: z.number().nullish(),
  })
  .passthrough()
export type TowerRollPayload = z.infer<typeof TowerRollPayloadSchema>

export function parseRollLine(line: string): TowerRollPayload {
  return TowerRollPayloadSchema.parse(JSON.parse(line))
}

export function parseRollLines(raw: string): readonly TowerRollPayload[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map(parseRollLine)
}

export function actionResultToRollPayload(
  input: ActionInput,
  result: ActionResult,
  meta: { turn: number; action?: string }
): TowerRollPayload {
  return {
    turn: meta.turn,
    ...(meta.action !== undefined ? { action: meta.action } : {}),
    result: result.line,
    shown: false,
    seed: input.seed,
    die: result.roll.mode,
    roll: result.roll.total,
    intent: result.intent,
    mode: input.mode,
    attackPower: result.attackPower,
    defense: result.defense,
    baseDamage: input.baseDamage,
    gate: result.gate,
    skillBonus: result.skillBonus,
    score: result.effectiveScore,
    margin: result.margin,
    damage: result.damage,
  }
}
