import { authorIn } from "akasha/commands/modules/commit-author/commit-author.module.code.ts"
import { uncommittedIn } from "akasha/pages/modules/uncommitted/page-uncommitted.module.code.ts"
import { textAt } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Fetcher,
  type Sleeper,
  writingFor,
} from "akasha/pages/service/modules/page-calling/page-calling.module.code.ts"

export const DEPLOYED_COMMIT = "deployedCommit"

export const REFUSED_COMMIT = "refusedCommit"

const DEPLOY_ENDED_AT = "deployEndedAt"

const DEPLOY_REFUSED_AT = "deployRefusedAt"

export function commitKeptIn(root: string, pagePath: string, key: string): string | null {
  const kept = uncommittedIn(root, pagePath)
  return kept === null ? null : textAt(kept, key)
}

export function commitRecordedIn(root: string, pagePath: string): string | null {
  return commitKeptIn(root, pagePath, DEPLOYED_COMMIT)
}

export function saidOfNoRecord(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` was put up at ${commit}, and that commit was not kept beside its page, so the next deploy would judge itself against the commit before this one: ${wrong.join("\n")}`
}

export function saidOfNoRefusal(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` refused at ${commit}, and that commit was not kept beside its page, so a loop would try that same commit again: ${wrong.join("\n")}`
}

async function wroteUnder(
  root: string,
  pagePath: string,
  key: string,
  commit: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  if (commitKeptIn(root, pagePath, key) === commit) return []
  const wrote = await writingFor(
    {
      writer: authorIn(),
      message: `a deploy keeps ${key} beside ${pagePath}`,
      kept: [{ path: pagePath, values: { [key]: commit } }],
    },
    fetcher,
    naps
  )
  return "refused" in wrote ? [wrote.refused] : []
}

function momentIn(root: string, pagePath: string, key: string): number | null {
  const said = commitKeptIn(root, pagePath, key)
  if (said === null) return null
  const at = Date.parse(said)
  return Number.isFinite(at) ? at : null
}

export function endedIn(root: string, pagePath: string): number | null {
  return momentIn(root, pagePath, DEPLOY_ENDED_AT)
}

export function refusedAtIn(root: string, pagePath: string): number | null {
  return momentIn(root, pagePath, DEPLOY_REFUSED_AT)
}

function saidOfNoEnding(slug: string, wrong: readonly string[]): string {
  return `\`${slug}\` was deployed, and the moment that deploy ended was not kept beside its page, so a loop would deploy it again without waiting out its cooldown: ${wrong.join("\n")}`
}

export async function recordedEnding(
  root: string,
  slug: string,
  pagePath: string,
  refused: boolean = false,
  at: Date = new Date(),
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  const said = at.toISOString()
  const wrong = [
    ...(await wroteUnder(root, pagePath, DEPLOY_ENDED_AT, said, fetcher, naps)),
    ...(refused ? await wroteUnder(root, pagePath, DEPLOY_REFUSED_AT, said, fetcher, naps) : []),
  ]
  return wrong.length === 0 ? [] : [saidOfNoEnding(slug, wrong)]
}

export async function recordedCommit(
  root: string,
  slug: string,
  pagePath: string,
  commit: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  const wrong = await wroteUnder(root, pagePath, DEPLOYED_COMMIT, commit, fetcher, naps)
  return wrong.length === 0 ? [] : [saidOfNoRecord(slug, commit, wrong)]
}

export async function recordedRefusal(
  root: string,
  slug: string,
  pagePath: string,
  commit: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  const wrong = await wroteUnder(root, pagePath, REFUSED_COMMIT, commit, fetcher, naps)
  return wrong.length === 0 ? [] : [saidOfNoRefusal(slug, commit, wrong)]
}
