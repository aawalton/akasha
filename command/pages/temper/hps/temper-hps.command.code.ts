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
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import {
  healingOverRotation,
  type RotationSkill,
} from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"
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
  const abilities = [...(fight.abilities ?? [])].sort((a, b) => b.healing - a.healing)
  const healed = abilities.reduce((sum, one) => sum + one.healing, 0) + fight.absorbed
  const perSecond = fight.activeSeconds > 0 ? healed / fight.activeSeconds : 0
  return [
    "",
    `the game, last fight: ${Math.round(perSecond)} healing per second over ${Math.round(fight.activeSeconds)} active seconds`,
    ...abilities
      .filter((one) => one.healing > 0 || one.casts > 0)
      .map(
        (one) =>
          `  ${one.name}: ${one.casts} casts, ${Math.round(one.healing)} healing, ${Math.round(one.overheal)} overheal`
      ),
    `  shields absorbed: ${Math.round(fight.absorbed)}`,
  ]
}

const FIGHT_SECONDS = 60

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
  if (read.taken.json) return asJson({ character: slug, ...healed, unread, game: game ?? null })
  const lines = [
    `${Math.round(healed.healingPerSecond)} healing per second over ${FIGHT_SECONDS} seconds`,
    ...healed.skills.map(
      (one) => `  ${one.name}: ${one.casts} casts, ${Math.round(one.healing)} healing`
    ),
    `  light attacks: ${healed.lightAttacks}`,
  ]
  for (const one of unread) {
    lines.push("", `healing no shape here reads, in ${one.name}:`)
    for (const sentence of one.sentences) lines.push(`  ${sentence}`)
  }
  lines.push(...gameLines(game))
  return told(lines)
}
