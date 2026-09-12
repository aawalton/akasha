import type { CurrentTreeState } from "akasha/alan/harness/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts"
import {
  compareCutStatus,
  readLatestCutFingerprint,
} from "akasha/alan/harness/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts"
import {
  computeBuildInputTreeHash,
  countCommitsBetween,
  fetchedSaid,
  fetchOrigin,
  resolveRef,
  resolveRepoRoot,
} from "akasha/alan/harness/mobile-cli/git-tree-hash/git-tree-hash.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  appIn,
  shellRepoRoot,
} from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { buildInputSources } from "akasha/alan/harness/mobile-cli/modules/build-input-sources/build-input-sources.module.code.ts"
import { simRunSharedRepoPaths } from "akasha/alan/harness/mobile-cli/sim-run-tree/sim-run-tree.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { app } from "akasha/commands/arguments/pages/app.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  answering,
  asJson,
  keyedLines,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileCutStatus as page } from "akasha/commands/pages/mobile/cut/status/mobile-cut-status.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const MAIN = "origin/main"

const SHORT_SHA = 12

export type Read = {
  readonly app: MobileApp
  readonly json: boolean
}

export type Comparing = (done: string[], read: Read) => Promise<Answer>

async function compared(done: string[], read: Read): Promise<Answer> {
  const repoRoot = resolveRepoRoot(codeRoot())
  fetchOrigin(repoRoot)
  done.push(fetchedSaid(repoRoot))
  const mainSha = resolveRef(repoRoot, MAIN)

  const shellRoot = resolveRepoRoot(shellRepoRoot(read.app))
  fetchOrigin(shellRoot)
  done.push(fetchedSaid(shellRoot))

  const current: CurrentTreeState = {
    mainSha,
    buildInputTreeHash: computeBuildInputTreeHash(
      buildInputSources(
        read.app,
        { root: repoRoot, ref: MAIN },
        { root: shellRoot, ref: MAIN },
        simRunSharedRepoPaths()
      )
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

export async function mobileCutStatus(
  argv: readonly string[],
  given: Given,
  comparing: Comparing = compared
): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, [json, app])
  if ("refused" in said) return refusedBy(said.refused)
  const held = appIn(said.taken.app)
  if ("refused" in held) return refusedBy(held.refused)
  const read: Read = { app: held, json: said.taken.json }
  return await answering(async (done) => await comparing(done, read))
}
