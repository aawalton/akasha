import type { Answer } from "@akasha/command-system/calling"
import { buildInputSources } from "@akasha/mobile-cli/build-input-sources"
import type { CurrentTreeState } from "@akasha/mobile-cli/cut-fingerprint"
import { compareCutStatus, readLatestCutFingerprint } from "@akasha/mobile-cli/cut-fingerprint"
import {
  computeBuildInputTreeHash,
  countCommitsBetween,
  fetchOrigin,
  resolveRef,
  resolveRepoRoot,
} from "@akasha/mobile-cli/git-tree-hash"
import type { MobileApp } from "@akasha/mobile-cli/mobile-app"
import { shellRepoRoot } from "@akasha/mobile-cli/mobile-app"
import { codeRoot } from "@akasha/pages-system/code-root"
import {
  APP_SAID,
  answering,
  appIn,
  asJson,
  flagsAloneIn,
  JSON_SAID,
  keyedLines,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

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

async function stated(read: Read): Promise<Answer> {
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
  return await answering(async () => await stated(read))
}
