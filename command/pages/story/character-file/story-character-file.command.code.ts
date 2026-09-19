import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { batch as batchArgument } from "akasha/command/argument/pages/batch.argument.ts"
import { readingsDir as readingsDirArgument } from "akasha/command/argument/pages/readings-dir.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyCharacterFile as page } from "akasha/command/pages/story/character-file/story-character-file.command.ts"
import {
  FilingRefused,
  fileCharacters,
  type Landed,
} from "akasha/story/world/characters/modules/character-filing/character-filing.module.code.ts"

const NAMED = [readingsDirArgument, batchArgument] as const

const BLANK = `\`${readingsDirArgument.said}\` names no folder`

export type Taken = { readonly dir: string; readonly batch: number }

export type Reading = Taken | { readonly refused: string }

export function taken(argv: readonly string[], calledAs: string): Reading {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const dir = (held.readingsDir ?? "").trim()
  if (dir === "") return { refused: BLANK }
  const batch = held.batch ?? 1000
  if (!Number.isInteger(batch) || batch < 1) {
    return { refused: `\`${batchArgument.said}\` takes a whole number of one or more` }
  }
  return { dir, batch }
}

export function rowsOf(said: Landed): readonly string[] {
  return [
    `characters\t${said.characters}`,
    `claims\t${said.claims}`,
    `batches\t${said.batches}`,
    `chapters-read\t${said.filesRead}`,
    `chapters-passed\t${said.filesPassed}`,
    ...said.commits.map((one) => `commit\t${one}`),
  ]
}

async function filed(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  try {
    const said = await fileCharacters({
      root: given.root,
      dir: held.dir,
      batch: held.batch,
      landing,
      done,
    })
    return told(rowsOf(said))
  } catch (thrown) {
    if (thrown instanceof FilingRefused) return refused(thrown.message, DATA)
    throw thrown
  }
}

export async function storyCharacterFile(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await filed(done, argv, given, landing))
}
