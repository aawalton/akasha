import { z } from "zod"
import { AttributesSchema } from "../character-schema/character-schema.module.code.ts"

export const SearchableSchema = z
  .object({
    thing: z.string(),
    use: z.string().optional(),
    status: z.string().optional(),
    note: z.string().optional(),
  })
  .passthrough()
export type Searchable = z.infer<typeof SearchableSchema>

export const RoomSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    desc: z.string().optional(),
    searchables: z.array(SearchableSchema).optional(),
    water: z.string().optional(),
    light: z.string().optional(),
    otherExits: z.string().optional(),
    exhausted: z.string().optional(),
  })
  .passthrough()
export type Room = z.infer<typeof RoomSchema>

export const FloorEnemySchema = z
  .object({
    name: z.string(),
    kind: z.literal("enemy"),
    level: z.number(),
    class: z.string().optional(),
    attributes: AttributesSchema,
    rollMode: z.enum(["2d10", "1d20"]).optional(),
    equipment: z
      .object({
        weapon: z.object({ atk: z.number().optional() }).passthrough().nullish(),
        armor: z.object({ def: z.number().optional() }).passthrough().nullish(),
      })
      .passthrough()
      .optional(),
    baseDamage: z.number().optional(),
    intentTypical: z.number().optional(),
    readableTrait: z.string().optional(),
    hpNote: z.string().optional(),
  })
  .passthrough()
export type FloorEnemy = z.infer<typeof FloorEnemySchema>

export const EncounterSchema = z
  .object({
    id: z.string(),
    trigger: z.string().optional(),
    enemy: FloorEnemySchema,
    reward: z
      .object({ xp: z.number().optional(), drop: z.string().optional() })
      .passthrough()
      .optional(),
  })
  .passthrough()
export type Encounter = z.infer<typeof EncounterSchema>

export const FloorSchema = z
  .object({
    floor: z.number(),
    name: z.string(),
    theme: z.string().optional(),
    exits: z.array(z.string()).optional(),
    rooms: z.array(RoomSchema).optional(),
    encounters: z.array(EncounterSchema).optional(),
  })
  .passthrough()
export type Floor = z.infer<typeof FloorSchema>

export function parseFloor(raw: string): Floor {
  return FloorSchema.parse(JSON.parse(raw))
}
