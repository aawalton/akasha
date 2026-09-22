import { statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { game as gameArgument } from "akasha/command/argument/pages/game.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { gameImport as page } from "akasha/command/pages/game/import/game-import.command.ts"
import type { Filed } from "akasha/story/game/modules/page-filing/page-filing.module.code.ts"
import {
  rowsOf,
  type Where,
  whereAt,
} from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import { everyFiled } from "akasha/story/game/modules/world-filing/world-filing.module.code.ts"
import { entities } from "akasha/story/game/properties/entities.file-property.ts"
import { gameCharacters } from "akasha/story/game/properties/game-characters.file-property.ts"
import { states } from "akasha/story/game/properties/states.file-property.ts"
import { towerFloors } from "akasha/story/game/properties/tower-floors.file-property.ts"
import { everyQuestFiled } from "akasha/story/game/quest/modules/quest-filing/quest-filing.module.code.ts"
import { everyTurnFiled } from "akasha/story/game/turn/modules/turn-filing/turn-filing.module.code.ts"

const NAMED = [gameArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const FILES = [gameCharacters.propertySlug, towerFloors.propertySlug, entities.propertySlug]

const TAB = "\t"

export type Taken = { readonly game: string }

export type Read = Taken | { readonly refused: string }

type Gathered = { readonly answered: readonly Filed[] } | { readonly refused: string }

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const game = read.taken.game.trim()
  if (game === "") return { refused: `\`${gameArgument.said}\` names no game` }
  return { game }
}

export function messageFor(game: string, count: number): string {
  return `take ${count} of ${game}'s rows into pages`
}

export function saidOf(filed: readonly Filed[], commit: string | null): readonly string[] {
  const said = filed.map((one) => `wrote${TAB}${one.at}`)
  if (commit !== null) said.push(`commit${TAB}${commit}`)
  return said
}

export function unfiledOf(root: string, filed: readonly Filed[]): readonly Filed[] {
  return filed.filter((one) => {
    const at = isAbsolute(one.at) ? one.at : join(root, one.at)
    return statSync(at, { throwIfNoEntry: false }) === undefined
  })
}

export function gatheredAt(where: Where): Gathered {
  const rows: unknown[] = []
  for (const property of FILES) {
    const read = rowsOf(where, property)
    if ("refused" in read) return read
    rows.push(...read.answered)
  }
  const worldly = everyFiled(where, rows)
  if ("refused" in worldly) return worldly
  const held = rowsOf(where, states.propertySlug)
  if ("refused" in held) return held
  const turned = everyTurnFiled(where, held.answered)
  if ("refused" in turned) return turned
  const quested = everyQuestFiled(where, held.answered)
  if ("refused" in quested) return quested
  return { answered: [...worldly.answered, ...turned.answered, ...quested.answered] }
}

async function imported(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const found = whereAt(given.root, held.game)
  if ("refused" in found) return refused(found.refused, DATA)
  const gathered = gatheredAt(found.answered)
  if ("refused" in gathered) return refused(gathered.refused, DATA)
  const filed = unfiledOf(given.root, gathered.answered)
  if (filed.length === 0) {
    return refused(`\`${held.game}\` has no row left to take into a page`, DATA)
  }
  const landed = await landing(
    given.root,
    filed.map((one) => ({ at: PUT, given: { at: one.at, body: one.body } })),
    messageFor(held.game, filed.length),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(saidOf(filed, landed.commit))
}

export async function gameImport(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await imported(done, argv, given, landing))
}
