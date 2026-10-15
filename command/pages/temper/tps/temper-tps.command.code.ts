import { existsSync, readFileSync } from "node:fs"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { characterCompletionAt } from "akasha/command/pages/temper/modules/character-completion-reading/character-completion-reading.module.code.ts"
import { temperTps as page } from "akasha/command/pages/temper/tps/temper-tps.command.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import { reavingBlows } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/reaving-blows.temper-champion-star.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import {
  type EnchantProc,
  procsWithin,
  readEnchantProc,
} from "akasha/temper/player/character/stat/modules/enchant-proc/enchant-proc.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  healingOverRotation,
  meanUltimate,
  type RotationHealed,
  type RotationSkill,
  type RotationUltimate,
} from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"
import { readSkillDamage } from "akasha/temper/player/character/stat/modules/skill-damage/skill-damage.module.code.ts"
import { readSkillHealing } from "akasha/temper/player/character/stat/modules/skill-healing/skill-healing.module.code.ts"
import {
  readHealingPerUltimatePoint,
  readHeroism,
} from "akasha/temper/player/character/stat/modules/skill-ultimate/skill-ultimate.module.code.ts"
import {
  armorShareOf,
  damageLeft,
  type Toughness,
  toughnessPerSecond,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"
import { criticalRating } from "akasha/temper/player/character/stat/temper-metric/pages/critical-rating/critical-rating.temper-metric.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { z } from "zod"

const NAMED = [character, json]

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
})

const RESOURCES = [
  ["magicka", "Magicka"],
  ["stamina", "Stamina"],
  ["ultimate", "Ultimate"],
] as const

type LastFight = z.infer<typeof lastFightShape>

function lastFightOf(slug: string): LastFight | undefined {
  const path = savedVarsFile("TemperCombat.lua")
  if (!existsSync(path)) return undefined
  const content = readFileSync(path, "utf8")
  if (!LAST_FIGHT_ASSIGNED.test(content)) return undefined
  const fight = lastFightShape.parse(parseLuaSavedVariablesFile(content, LAST_FIGHT_GLOBAL))
  return slugOf(fight.character) === slug ? fight : undefined
}

function gameLines(fight: LastFight | undefined, toughness: Toughness): string[] {
  if (fight === undefined) return ["", "the game has written no fight for this character yet"]
  const abilities = [...(fight.abilities ?? [])].sort(
    (a, b) => b.healing + b.overheal - (a.healing + a.overheal)
  )
  const shields = fight.shielded ?? fight.absorbed
  const healed = abilities.reduce((sum, one) => sum + one.healing + one.overheal, 0) + shields
  const perSecond = toughnessPerSecond(toughness, healed, fight.activeSeconds)
  return [
    "",
    `the game, last fight: ${Math.round(perSecond)} toughness per second over ${Math.round(fight.activeSeconds)} active seconds`,
    `  healing and shields: ${Math.round(healed / Math.max(1, fight.activeSeconds))} per second`,
    ...abilities
      .filter((one) => one.healing + one.overheal > 0 || one.casts > 0 || (one.presses ?? 0) > 0)
      .map(
        (one) =>
          `  ${one.name || `ability ${one.abilityId}`}: ${one.presses ?? 0} presses, ${Math.round(one.healing)} healing, ${Math.round(one.overheal)} overheal`
      ),
    fight.shielded === undefined
      ? "  shields granted: not captured in this fight, so what they absorbed is counted"
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

const FIGHT_SECONDS = 60

const pct = (share: number) => `${(share * 100).toFixed(1)}%`

const PERCENT_OF_DAMAGE = /(\d+)% of the damage/

function reavingBlowsShare(): number {
  const read = PERCENT_OF_DAMAGE.exec(reavingBlows.description)
  if (read === null) throw new Error("the Reaving Blows page names no percent of the damage done")
  return Number(read[1]) / 100
}

type Build = NonNullable<ReturnType<typeof decodeBuild>>

type Multipliers = Toughness & { readonly healing: number; readonly damage: number }

const PLAIN: Multipliers = {
  healing: 1,
  damage: 1,
  healthMaximum: 0,
  armorShare: 0,
  damageTaken: 0,
}

const READING_BARS = [
  ["frontBar", "primary-weapon-bar"],
  ["backBar", "backup-weapon-bar"],
] as const

async function buildOf(completion: CharacterCompletion): Promise<Build | null> {
  if (completion.buildHash === undefined) return null
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  return decodeBuild(completion.buildHash)
}

function slotsReavingBlows(build: Build | null): boolean {
  if (build === null) return false
  const slotted: readonly string[] = build.championPoints.warfare.slotted
  return slotted.includes(reavingBlows.slug)
}

function multipliersOf(build: Build | null, completion: CharacterCompletion): Multipliers {
  if (build === null) return PLAIN
  const each: Multipliers[] = []
  for (const [readingKey, bar] of READING_BARS) {
    const reading = completion.reportedStats?.[readingKey]
    if (reading?.activeBuffs === undefined) continue
    const metrics = calculateReadingStatsByBar(
      build,
      bar,
      reading.activeBuffs,
      reading.championPoints
    ).metrics as Record<string, { value: number } | undefined>
    const value = (metric: string) => metrics[metric]?.value ?? 0
    const chance = Math.min(1, value("critical-rating") / criticalRating.divisor)
    each.push({
      healing: (1 + value("healing-total")) * (1 + chance * value("healing-critical-bonus")),
      damage: 1 + chance * value("critical-damage"),
      healthMaximum: value("health-maximum"),
      armorShare: armorShareOf(value("resistance-physical"), value("resistance-spell")),
      damageTaken: value("damage-taken"),
    })
  }
  if (each.length === 0) return PLAIN
  const mean = (pick: (one: Multipliers) => number) =>
    each.reduce((sum, one) => sum + pick(one), 0) / each.length
  return {
    healing: mean((one) => one.healing),
    damage: mean((one) => one.damage),
    healthMaximum: mean((one) => one.healthMaximum),
    armorShare: mean((one) => one.armorShare),
    damageTaken: mean((one) => one.damageTaken),
  }
}

function enchantProcOf(completion: CharacterCompletion): EnchantProc | undefined {
  const procs: EnchantProc[] = []
  for (const bar of BARS) {
    for (const piece of completion.reportedStats?.[bar]?.worn ?? []) {
      const proc = readEnchantProc(piece.enchant)
      if (proc !== undefined) procs.push(proc)
    }
  }
  if (procs.length === 0) return undefined
  const mean = (pick: (proc: EnchantProc) => number) =>
    procs.reduce((sum, proc) => sum + pick(proc), 0) / procs.length
  return { damage: mean((proc) => proc.damage), healing: mean((proc) => proc.healing) }
}

const ULTIMATE_SLOT = 8

function ultimateLine(healed: RotationHealed): string {
  const spent = healed.ultimate
  if (spent === undefined) {
    return "  ultimate: no reading keeps its cost and the healing each point spent gives, so a reload on each bar takes them"
  }
  return `  ${spent.name}: ${spent.casts} casts from ${Math.round(spent.gained)} Ultimate built from none, ${Math.round(spent.healing)} healing`
}

const BARS = ["frontBar", "backBar"] as const

type Unread = { readonly name: string; readonly sentences: readonly string[] }

export async function temperTps(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.character
  if (slug === undefined) return refused("a character is named by its page's slug", INPUT)

  let completion: CharacterCompletion
  try {
    completion = characterCompletionAt(slug)
  } catch (thrown) {
    return refused(`no completion is read for \`${slug}\`: ${saidBy(thrown)}`, DATA)
  }

  const skills: RotationSkill[] = []
  const unread: Unread[] = []
  const ultimates: RotationUltimate[] = []
  for (const bar of BARS) {
    const kept = completion.reportedStats?.[bar]?.skills
    if (kept === undefined) {
      return refused(
        `the ${bar} reading of \`${slug}\` kept no skills, so a reload on that bar is taken first`,
        DATA
      )
    }
    for (const skill of kept) {
      if (skill.slot === ULTIMATE_SLOT) {
        const reading = completion.reportedStats?.[bar]
        const perPoint = (reading?.classPassives ?? [])
          .map((passive) => readHealingPerUltimatePoint(passive.description))
          .find((one) => one !== undefined)
        if (skill.ultimateCost !== undefined && perPoint !== undefined) {
          ultimates.push({ name: skill.name, cost: skill.ultimateCost, healingPerPoint: perPoint })
        }
        continue
      }
      const healing = readSkillHealing(skill.description)
      skills.push({
        name: skill.name,
        durationMs: skill.durationMs,
        castMs: skill.castMs,
        cooldownMs: skill.cooldownMs,
        healing,
        damage: readSkillDamage(skill.description),
        heroism: readHeroism(skill.description),
      })
      if (healing.unread.length > 0) unread.push({ name: skill.name, sentences: healing.unread })
    }
  }

  let game: LastFight | undefined
  try {
    game = lastFightOf(slug)
  } catch (thrown) {
    return refused(`the combat add-on's last fight does not read: ${saidBy(thrown)}`, DATA)
  }

  const healed = healingOverRotation(skills, FIGHT_SECONDS, meanUltimate(ultimates))
  const proc = enchantProcOf(completion)
  const procs = proc === undefined ? 0 : procsWithin(FIGHT_SECONDS)
  const enchantHealing = procs * (proc?.healing ?? 0)
  const build = await buildOf(completion)
  const multipliers = multipliersOf(build, completion)
  const directDamage = (healed.directDamage + procs * (proc?.damage ?? 0)) * multipliers.damage
  const reaving = slotsReavingBlows(build) ? reavingBlowsShare() * directDamage : 0
  const heals = healed.healingPerSecond * FIGHT_SECONDS - healed.shielded
  const total = (heals + enchantHealing + reaving) * multipliers.healing + healed.shielded
  const perSecond = total / FIGHT_SECONDS
  const tps = toughnessPerSecond(multipliers, total, FIGHT_SECONDS)
  if (read.taken.json) {
    return asJson({
      character: slug,
      ...healed,
      healingPerSecond: perSecond,
      toughnessPerSecond: tps,
      healthMaximum: multipliers.healthMaximum,
      armorShare: multipliers.armorShare,
      damageTaken: multipliers.damageTaken,
      directDamage,
      reavingBlowsHealing: reaving,
      enchantProcs: procs,
      enchantHealing,
      unread,
      game: game ?? null,
    })
  }
  const lines = [
    `${Math.round(tps)} toughness per second over ${FIGHT_SECONDS} seconds`,
    `  max health: ${Math.round(multipliers.healthMaximum)}`,
    `  armor takes ${pct(multipliers.armorShare)}, damage taken ${pct(multipliers.damageTaken)}, so ${pct(damageLeft(multipliers))} of damage lands`,
    `  healing and shields: ${Math.round(perSecond)} per second`,
    ...healed.skills.map(
      (one) => `  ${one.name}: ${one.casts} casts, ${Math.round(one.healing)} healing`
    ),
    ultimateLine(healed),
    `  light attacks: ${healed.lightAttacks}`,
    `  heals scaled by ${multipliers.healing.toFixed(3)} for critical heals and healing done, shields not`,
    `  weapon enchant: ${procs} procs, ${Math.round(enchantHealing)} healing`,
    `  Reaving Blows: ${Math.round(reaving)} healing from ${Math.round(directDamage)} direct damage`,
  ]
  for (const one of unread) {
    lines.push("", `healing no shape here reads, in ${one.name}:`)
    for (const sentence of one.sentences) lines.push(`  ${sentence}`)
  }
  lines.push(...gameLines(game, multipliers))
  return told(lines)
}
