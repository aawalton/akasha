import { codeRoot } from "@akasha/pages/code-root"
import { buildInputSources } from "akasha/alan/harness/mobile-cli/build-input-sources/build-input-sources.module.code.ts"
import type { CurrentTreeState } from "akasha/alan/harness/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts"
import {
  compareCutStatus,
  readLatestCutFingerprint,
} from "akasha/alan/harness/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts"
import {
  computeBuildInputTreeHash,
  countCommitsBetween,
  fetchOrigin,
  resolveRef,
  resolveRepoRoot,
} from "akasha/alan/harness/mobile-cli/git-tree-hash/git-tree-hash.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { shellRepoRoot } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  APP_SAID,
  appIn,
  JSON_SAID,
  keyedLines,
  type Reading,
  wordsIn,
} from "../../../../../mobile-commands/mobile-answering/mobile-answering.module.code.ts"
import {
  answering,
  asJson,
  flagsAloneIn,
  refusedBy,
  told,
} from "../../../../modules/answering/command-answering.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"

const MAIN = "origin/main"

const SHORT_SHA = 12

const VALUED = [APP_SAID]

const SWITCHES = [JSON_SAID]

export type Read = {
  readonly app: MobileApp
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  const app = appIn(said)
  if ("refused" in app) return app
  return { app, json: said.flags.has(JSON_SAID) }
}

async function compared(read: Read): Promise<Answer> {
  const repoRoot = resolveRepoRoot(codeRoot())
  fetchOrigin(repoRoot)
  const mainSha = resolveRef(repoRoot, MAIN)

  const shellRoot = resolveRepoRoot(shellRepoRoot(read.app))
  fetchOrigin(shellRoot)

  const current: CurrentTreeState = {
    mainSha,
    buildInputTreeHash: computeBuildInputTreeHash(
      buildInputSources(read.app, { root: repoRoot, ref: MAIN }, { root: shellRoot, ref: MAIN })
    ),
  }

  const last = await readLatestCutFingerprint(read.app.slug)
  const status = compareCutStatus(last, current)
  const since = last === null ? null : countCommitsBetween(repoRoot, last.mainSha, MAIN)

  if (read.json) {
    return asJson({
      owed: status.owed,
      buildInputChanged: status.buildInputChanged,
      predatesBasis: status.predatesBasis,
      app: read.app.slug,
      currentMainSha: mainSha,
      lastCut: status.lastCut,
      commitsSinceLastCut: since,
    })
  }

  if (last === null) {
    return told([
      `owed\t${read.app.slug}\tno cut is on record, so the phones carry no build from this era`,
    ])
  }

  if (status.owed) {
    return told([
      `owed\t${read.app.slug}\torigin/main is ahead of the last shipped cut`,
      ...keyedLines([
        ["last build", last.buildNumber],
        ["last main", last.mainSha.slice(0, SHORT_SHA)],
        ["last cut at", last.cutAt],
        ["commits since", since],
        [
          "why",
          status.predatesBasis
            ? "the last cut predates the corrected build-input basis and carries no comparable hash"
            : "the build inputs changed since the last cut",
        ],
      ]),
    ])
  }

  return told([
    `current\t${read.app.slug}\tthe last cut matches origin/main, so no cut is owed`,
    ...keyedLines([
      ["last build", last.buildNumber],
      ["last main", last.mainSha.slice(0, SHORT_SHA)],
    ]),
  ])
}

export async function mobileCutStatus(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await compared(read))
}
