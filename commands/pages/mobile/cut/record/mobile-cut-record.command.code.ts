import type { CutFingerprint } from "akasha/alan/harness/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts"
import {
  readLatestCutFingerprint,
  recordCutFingerprint,
} from "akasha/alan/harness/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts"
import { appIn } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { app } from "akasha/commands/arguments/pages/app.argument.ts"
import { buildInputTreeHash } from "akasha/commands/arguments/pages/build-input-tree-hash.argument.ts"
import { buildNumber } from "akasha/commands/arguments/pages/build-number.argument.ts"
import { cutAt } from "akasha/commands/arguments/pages/cut-at.argument.ts"
import { mainSha } from "akasha/commands/arguments/pages/main-sha.argument.ts"
import { shellSha } from "akasha/commands/arguments/pages/shell-sha.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileCutRecord as page } from "akasha/commands/pages/mobile/cut/record/mobile-cut-record.command.ts"

const TAKES = [app, buildNumber, mainSha, shellSha, buildInputTreeHash, cutAt]

const SHORT_SHA = 12

const LEAST_BUILD = 1

export type Reading<T> = T | { readonly refused: readonly string[] }

export type Read = {
  readonly appSlug: string
  readonly fingerprint: CutFingerprint
}

export function buildIn(held: number): Reading<number> {
  if (held < LEAST_BUILD) {
    return {
      refused: [
        `\`${buildNumber.said}\` names a build at or above one, and \`${held}\` is below it`,
      ],
    }
  }
  return held
}

export function momentIn(said: string | undefined, nowIso: string): Reading<string> {
  const at = said ?? nowIso
  if (Number.isNaN(Date.parse(at))) return { refused: [`\`${at}\` is no instant this can read`] }
  return at
}

async function filed(read: Read, done: string[]): Promise<Answer> {
  const last = await readLatestCutFingerprint(read.appSlug)
  if (last !== null && last.buildNumber === read.fingerprint.buildNumber) {
    return told([
      `${read.appSlug}\tbuild ${last.buildNumber} already carries a fingerprint cut at ${last.cutAt}, so nothing was written`,
    ])
  }
  await recordCutFingerprint(read.appSlug, read.fingerprint, done)
  return told([
    `filed\t${read.appSlug}\tbuild ${read.fingerprint.buildNumber}\t` +
      `main ${read.fingerprint.mainSha.slice(0, SHORT_SHA)}\tcut at ${read.fingerprint.cutAt}`,
  ])
}

export async function mobileCutRecord(argv: readonly string[], given: Given): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in said) return refusedBy(said.refused)
  const taken = said.taken
  const build = buildIn(taken.buildNumber)
  if (typeof build !== "number") return refusedBy(build.refused)
  const moment = momentIn(taken.cutAt, new Date().toISOString())
  if (typeof moment !== "string") return refusedBy(moment.refused)
  const held = appIn(taken.app)
  if ("refused" in held) return refusedBy(held.refused)
  const read: Read = {
    appSlug: held.slug,
    fingerprint: {
      buildNumber: build,
      mainSha: taken.mainSha,
      shellSha: taken.shellSha ?? null,
      buildInputTreeHash: taken.buildInputTreeHash ?? null,
      cutAt: moment,
    },
  }
  return await answering(async (done) => await filed(read, done))
}
