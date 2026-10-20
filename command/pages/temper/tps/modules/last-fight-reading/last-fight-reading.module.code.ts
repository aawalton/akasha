import { existsSync, readFileSync } from "node:fs"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import {
  killingHit,
  physicalShareOf,
  spellShareOf,
  type Toughness,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"
import { z } from "zod"

const LAST_FIGHT_GLOBAL = "TemperCombat_LastFight"

const LAST_FIGHT_ASSIGNED = new RegExp(`${LAST_FIGHT_GLOBAL}\\s*=\\s*\\{`)

const fightAbilityShape = z.strictObject({
  abilityId: z.number(),
  name: z.string(),
  healing: z.number(),
  overheal: z.number(),
  hits: z.number(),
  casts: z.number(),
  presses: z.number().optional(),
})

const resourceShape = z.strictObject({ gained: z.number(), spent: z.number() })

const fightTickShape = z.strictObject({
  healing: z.number(),
  shield: z.number(),
  healthMaximum: z.number(),
  physical: z.number(),
  spell: z.number(),
})

const lastFightShape = z.strictObject({
  character: z.string(),
  capturedAt: z.number(),
  activeSeconds: z.number(),
  combatSeconds: z.number(),
  absorbed: z.number(),
  shielded: z.number().optional(),
  magicka: resourceShape.optional(),
  stamina: resourceShape.optional(),
  ultimate: resourceShape.optional(),
  abilities: luaArrayOrEmpty(fightAbilityShape).optional(),
  ticks: luaArrayOrEmpty(fightTickShape).optional(),
})

const RESOURCES = [
  ["magicka", "Magicka"],
  ["stamina", "Stamina"],
  ["ultimate", "Ultimate"],
] as const

export type LastFight = z.infer<typeof lastFightShape>

type DamageTaken = Pick<Toughness, "damageTakenMartial" | "damageTakenMagical">

export function lastFightOf(slug: string): LastFight | undefined {
  const path = savedVarsFile("TemperCombat.lua")
  if (!existsSync(path)) return undefined
  const content = readFileSync(path, "utf8")
  if (!LAST_FIGHT_ASSIGNED.test(content)) return undefined
  const fight = lastFightShape.parse(parseLuaSavedVariablesFile(content, LAST_FIGHT_GLOBAL))
  return slugOf(fight.character) === slug ? fight : undefined
}

function toughnessLines(fight: LastFight, damageTaken: DamageTaken): string[] {
  const ticks = (fight.ticks ?? []).filter((tick) => tick.healthMaximum > 0)
  if (ticks.length === 0) {
    return [
      `the game, last fight: ${Math.round(fight.activeSeconds)} active seconds, kept no ticks`,
    ]
  }
  const hits = ticks.map((tick) =>
    killingHit(
      {
        healthMaximum: tick.healthMaximum,
        physicalShare: physicalShareOf(tick.physical),
        spellShare: spellShareOf(tick.spell),
        damageTakenMartial: damageTaken.damageTakenMartial,
        damageTakenMagical: damageTaken.damageTakenMagical,
      },
      tick
    )
  )
  const mean = (pick: (tick: (typeof ticks)[number]) => number) =>
    Math.round(ticks.reduce((sum, tick) => sum + pick(tick), 0) / ticks.length)
  const tps = Math.round(hits.reduce((sum, hit) => sum + hit, 0) / hits.length)
  return [
    `the game, last fight: ${tps} toughness per second over ${ticks.length} ticks`,
    `  max health: ${mean((tick) => tick.healthMaximum)}, healing: ${mean((tick) => tick.healing)} a tick, shields up: ${mean((tick) => tick.shield)} a tick`,
  ]
}

export function gameLines(fight: LastFight | undefined, damageTaken: DamageTaken): string[] {
  if (fight === undefined) return ["", "the game has written no fight for this character yet"]
  const abilities = [...(fight.abilities ?? [])].sort(
    (a, b) => b.healing + b.overheal - (a.healing + a.overheal)
  )
  return [
    "",
    ...toughnessLines(fight, damageTaken),
    ...abilities
      .filter((one) => one.healing + one.overheal > 0 || one.casts > 0 || (one.presses ?? 0) > 0)
      .map(
        (one) =>
          `  ${one.name || `ability ${one.abilityId}`}: ${one.presses ?? 0} presses, ${Math.round(one.healing)} healing, ${Math.round(one.overheal)} overheal`
      ),
    fight.shielded === undefined
      ? "  shields granted: not captured in this fight"
      : `  shields granted: ${Math.round(fight.shielded)}`,
    `  shields absorbed: ${Math.round(fight.absorbed)}`,
    ...RESOURCES.flatMap(([key, name]) => {
      const resource = fight[key]
      if (resource === undefined) return []
      return [
        `  ${name}: ${Math.round(resource.gained)} gained, ${Math.round(resource.spent)} spent`,
      ]
    }),
  ]
}
