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
import { comparedLines } from "akasha/command/pages/temper/tps/modules/game-reading-comparing/game-reading-comparing.module.code.ts"
import {
  gameLines,
  type LastFight,
  lastFightOf,
} from "akasha/command/pages/temper/tps/modules/last-fight-reading/last-fight-reading.module.code.ts"
import { temperTps as page } from "akasha/command/pages/temper/tps/temper-tps.command.ts"
import {
  catalogBarsOf,
  rotationReadingOf,
} from "akasha/temper/player/character/stat/modules/character-rotation-reading/character-rotation-reading.module.code.ts"
import type { RotationHealed } from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"
import {
  damageLeft,
  magicalDamageLeft,
  martialDamageLeft,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const NAMED = [character, json]

const pct = (share: number) => `${(share * 100).toFixed(1)}%`

function ultimateLine(healed: RotationHealed): string {
  const spent = healed.ultimate
  if (spent === undefined) {
    return "  ultimate: no reading keeps its cost and the healing each point spent gives, so a reload on each bar takes them"
  }
  return `  ${spent.name}: ${spent.casts} casts from ${Math.round(spent.gained)} Ultimate built from none, ${Math.round(spent.healing)} healing`
}

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

  const reading = await rotationReadingOf(completion)
  if ("refused" in reading) return refused(`\`${slug}\`: ${reading.refused}`, DATA)

  let game: LastFight | undefined
  try {
    game = lastFightOf(slug)
  } catch (thrown) {
    return refused(`the combat add-on's last fight does not read: ${saidBy(thrown)}`, DATA)
  }

  const bars = await catalogBarsOf(completion)
  const inGame = completion.rotationReading

  const { healed, multipliers, attack } = reading
  if (read.taken.json) {
    return asJson({
      character: slug,
      ...healed,
      toughnessPerSecond: reading.toughnessPerSecond,
      damagePerSecond: reading.damagePerSecond,
      healingPerSecond: reading.healingPerSecond,
      healingLandedPerSecond: reading.healingLandedPerSecond,
      shieldsPerSecond: reading.shieldsPerSecond,
      shieldUp: reading.shieldUp,
      healthMaximum: multipliers.healthMaximum,
      physicalShare: multipliers.physicalShare,
      spellShare: multipliers.spellShare,
      damageTakenMartial: multipliers.damageTakenMartial,
      damageTakenMagical: multipliers.damageTakenMagical,
      lightAttack: attack.light,
      heavyAttack: attack.heavy,
      directDamage: reading.directDamage,
      reavingBlowsHealing: reading.reavingBlowsHealing,
      enchantProcs: reading.enchantProcs,
      enchantHealing: reading.enchantHealing,
      unread: reading.unread,
      catalogBars: bars,
      inGame: inGame ?? null,
      game: game ?? null,
    })
  }
  const lines = [
    `${Math.round(reading.toughnessPerSecond)} toughness per second over ${reading.fightSeconds} seconds`,
    `${Math.round(reading.damagePerSecond)} damage per second to one enemy`,
    `${Math.round(reading.healingPerSecond)} healing and shields per second`,
    `  max health: ${Math.round(multipliers.healthMaximum)}`,
    `  martial: armor takes ${pct(multipliers.physicalShare)}, damage taken ${pct(multipliers.damageTakenMartial)}, so ${pct(martialDamageLeft(multipliers))} lands`,
    `  magical: armor takes ${pct(multipliers.spellShare)}, damage taken ${pct(multipliers.damageTakenMagical)}, so ${pct(magicalDamageLeft(multipliers))} lands`,
    `  half martial and half magical, ${pct(damageLeft(multipliers))} of damage lands`,
    `  healing: ${Math.round(reading.healingLandedPerSecond)} a tick, shields given: ${Math.round(reading.shieldsPerSecond)} a second, shields up: ${Math.round(reading.shieldUp)} a tick`,
    ...healed.skills.map(
      (one) => `  ${one.name}: ${one.casts} casts, ${Math.round(one.healing)} healing`
    ),
    ultimateLine(healed),
    `  light attacks: ${healed.lightAttacks} of ${Math.round(attack.light)}, heavy attacks: ${healed.heavyAttacks} of ${Math.round(attack.heavy)}`,
    `  heals scaled by ${multipliers.healing.toFixed(3)} for critical heals and healing done, shields not`,
    `  weapon enchant: ${reading.enchantProcs} procs, ${Math.round(reading.enchantHealing)} healing`,
    `  Reaving Blows: ${Math.round(reading.reavingBlowsHealing)} healing from ${Math.round(reading.directDamage)} direct damage`,
  ]
  for (const one of reading.unread) {
    lines.push("", `healing no shape here reads, in ${one.name}:`)
    for (const sentence of one.sentences) lines.push(`  ${sentence}`)
  }
  lines.push(...comparedLines(bars, reading, inGame))
  lines.push(...gameLines(game, multipliers))
  return told(lines)
}
