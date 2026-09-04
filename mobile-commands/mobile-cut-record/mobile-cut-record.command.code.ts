import type { Answer } from "@akasha/command-system/calling"
import type { CutFingerprint } from "@akasha/mobile-cli/cut-fingerprint"
import { readLatestCutFingerprint, recordCutFingerprint } from "@akasha/mobile-cli/cut-fingerprint"
import {
  APP_SAID,
  answering,
  appIn,
  countOf,
  flagsAloneIn,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const BUILD_NUMBER = "--build-number"

const MAIN_SHA = "--main-sha"

const SHELL_SHA = "--shell-sha"

const TREE_HASH = "--build-input-tree-hash"

const CUT_AT = "--cut-at"

const VALUED = [APP_SAID, BUILD_NUMBER, MAIN_SHA, SHELL_SHA, TREE_HASH, CUT_AT]

const SHORT_SHA = 12

const LEAST_BUILD = 1

export type Read = {
  readonly appSlug: string
  readonly fingerprint: CutFingerprint
}

export function readIn(argv: readonly string[], nowIso: string): Reading<Read> {
  const said = wordsIn(argv, VALUED, [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }

  const counted = countOf(said.named[BUILD_NUMBER], BUILD_NUMBER)
  if (counted === null) {
    return {
      refused: [`\`${BUILD_NUMBER}\` names the build App Store Connect gave, and nothing did`],
    }
  }
  if (typeof counted === "object") return counted
  if (counted < LEAST_BUILD) {
    return {
      refused: [
        `\`${BUILD_NUMBER}\` names a build at or above one, and \`${counted}\` is below it`,
      ],
    }
  }

  const mainSha = said.named[MAIN_SHA]
  if (mainSha === undefined) {
    return { refused: [`\`${MAIN_SHA}\` names the commit the cut was taken at, and nothing did`] }
  }

  const cutAt = said.named[CUT_AT] ?? nowIso
  if (Number.isNaN(Date.parse(cutAt))) {
    return { refused: [`\`${cutAt}\` is no instant this can read`] }
  }

  const app = appIn(said)
  if ("refused" in app) return app

  return {
    appSlug: app.slug,
    fingerprint: {
      buildNumber: counted,
      mainSha,
      shellSha: said.named[SHELL_SHA] ?? null,
      buildInputTreeHash: said.named[TREE_HASH] ?? null,
      cutAt,
    },
  }
}

async function filed(read: Read): Promise<Answer> {
  const last = await readLatestCutFingerprint(read.appSlug)
  if (last !== null && last.buildNumber === read.fingerprint.buildNumber) {
    return told([
      `${read.appSlug}\tbuild ${last.buildNumber} already carries a fingerprint cut at ${last.cutAt}, so nothing was written`,
    ])
  }
  await recordCutFingerprint(read.appSlug, read.fingerprint)
  return told([
    `filed\t${read.appSlug}\tbuild ${read.fingerprint.buildNumber}\t` +
      `main ${read.fingerprint.mainSha.slice(0, SHORT_SHA)}\tcut at ${read.fingerprint.cutAt}`,
  ])
}

export async function mobileCutRecord(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv, new Date().toISOString())
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await filed(read))
}
