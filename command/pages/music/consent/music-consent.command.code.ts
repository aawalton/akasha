import { runAuthCli } from "akasha/alan/music/spotify/modules/auth-cli/spotify-auth-cli.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicConsent as page } from "akasha/command/pages/music/consent/music-consent.command.ts"

const NAMED = [] as const

const DONE = "spotify consent is saved"

export type Asking = (args: readonly string[]) => Promise<void>

export function rowsOf(said: string): readonly string[] {
  return [said]
}

async function answered(argv: readonly string[], given: Given, asking: Asking): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  await asking([])
  return told(rowsOf(DONE))
}

export async function musicConsent(
  argv: readonly string[],
  given: Given,
  asking: Asking = runAuthCli
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, asking))
}
