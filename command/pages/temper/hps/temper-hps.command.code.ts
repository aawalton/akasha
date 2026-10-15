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
import { temperHps as page } from "akasha/command/pages/temper/hps/temper-hps.command.ts"
import { characterCompletionAt } from "akasha/command/pages/temper/modules/character-completion-reading/character-completion-reading.module.code.ts"
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
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  healingOverRotation,
  type RotationSkill,
} from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"
import { readSkillDamage } from "akasha/temper/player/character/stat/modules/skill-damage/skill-damage.module.code.ts"
import { readSkillHealing } from "akasha/temper/player/character/stat/modules/skill-healing/skill-healing.module.code.ts"
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

const lastFightShape = z.strictObject({
  character: z.string(),
  capturedAt: z.number(),
  activeSeconds: z.number(),
  combatSeconds: z.number(),
  absorbed: z.number(),
  abilities: luaArrayOrEmpty(fightAbilityShape).optional(),
})

type LastFight = z.infer<typeof lastFightShape>

function lastFightOf(slug: string): LastFight | undefined {
  const path = savedVarsFile("TemperCombat.lua")
  if (!existsSync(path)) return undefined
  const content = readFileSync(path, "utf8")
  if (!LAST_FIGHT_ASSIGNED.test(content)) return undefined
  const fight = lastFightShape.parse(parseLuaSavedVariablesFile(content, LAST_FIGHT_GLOBAL))
  return slugOf(fight.character) === slug ? fight : undefined
}

function gameLines(fight: LastFight | undefined): string[] {
  if (fight === undefined) return ["", "the game has written no fight for this character yet"]
  const abilities = [...(fight.abilities ?? [])].sort(
    (a, b) => b.healing + b.overheal - (a.healing + a.overheal)
  )
  const healed =
    abilities.reduce((sum, one) => sum + one.healing + one.overheal, 0) + fight.absorbed
  const perSecond = fight.activeSeconds > 0 ? healed / fight.activeSeconds : 0
  return [
    "",
    `the game, last fight: ${Math.round(perSecond)} healing per second over ${Math.round(fight.activeSeconds)} active seconds`,
    ...abilities
      .filter((one) => one.healing + one.overheal > 0 || one.casts > 0 || (one.presses ?? 0) > 0)
      .map(
        (one) =>
          `  ${one.name || `ability ${one.abilityId}`}: ${one.presses ?? 0} presses, ${one.casts} casts, ${Math.round(one.healing)} healing, ${Math.round(one.overheal)} overheal`
      ),
    `  shields absorbed: ${Math.round(fight.absorbed)}`,
  ]
}

const FIGHT_SECONDS = 60

const PERCENT_OF_DAMAGE = /(\d+)% of the damage/

function reavingBlowsShare(): number {
  const read = PERCENT_OF_DAMAGE.exec(reavingBlows.description)
  if (read === null) throw new Error("the Reaving Blows page names no percent of the damage done")
  return Number(read[1]) / 100
}

async function slotsReavingBlows(completion: CharacterCompletion): Promise<boolean> {
  if (completion.buildHash === undefined) return false
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  const build = decodeBuild(completion.buildHash)
  if (build === null) return false
  const slotted: readonly string[] = build.championPoints.warfare.slotted
  return slotted.includes(reavingBlows.slug)
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

const BARS = ["frontBar", "backBar"] as const

type Unread = { readonly name: string; readonly sentences: readonly string[] }

export async function temperHps(argv: readonly string[], given: Given): Promise<Answer> {
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
  for (const bar of BARS) {
    const kept = completion.reportedStats?.[bar]?.skills
    if (kept === undefined) {
      return refused(
        `the ${bar} reading of \`${slug}\` kept no skills, so a reload on that bar is taken first`,
        DATA
      )
    }
    for (const skill of kept) {
      if (skill.slot === ULTIMATE_SLOT) continue
      const healing = readSkillHealing(skill.description)
      skills.push({
        name: skill.name,
        durationMs: skill.durationMs,
        castMs: skill.castMs,
        cooldownMs: skill.cooldownMs,
        healing,
        damage: readSkillDamage(skill.description),
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

  const healed = healingOverRotation(skills, FIGHT_SECONDS)
  const proc = enchantProcOf(completion)
  const procs = proc === undefined ? 0 : procsWithin(FIGHT_SECONDS)
  const enchantHealing = procs * (proc?.healing ?? 0)
  const directDamage = healed.directDamage + procs * (proc?.damage ?? 0)
  const reaving = (await slotsReavingBlows(completion)) ? reavingBlowsShare() * directDamage : 0
  const skillHealing = healed.healingPerSecond * FIGHT_SECONDS
  const perSecond = (skillHealing + enchantHealing + reaving) / FIGHT_SECONDS
  if (read.taken.json) {
    return asJson({
      character: slug,
      ...healed,
      healingPerSecond: perSecond,
      directDamage,
      reavingBlowsHealing: reaving,
      enchantProcs: procs,
      enchantHealing,
      unread,
      game: game ?? null,
    })
  }
  const lines = [
    `${Math.round(perSecond)} healing per second over ${FIGHT_SECONDS} seconds`,
    ...healed.skills.map(
      (one) => `  ${one.name}: ${one.casts} casts, ${Math.round(one.healing)} healing`
    ),
    `  light attacks: ${healed.lightAttacks}`,
    `  weapon enchant: ${procs} procs, ${Math.round(enchantHealing)} healing`,
    `  Reaving Blows: ${Math.round(reaving)} healing from ${Math.round(directDamage)} direct damage`,
  ]
  for (const one of unread) {
    lines.push("", `healing no shape here reads, in ${one.name}:`)
    for (const sentence of one.sentences) lines.push(`  ${sentence}`)
  }
  lines.push(...gameLines(game))
  return told(lines)
}
