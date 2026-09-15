import { authorIn } from "akasha/command/modules/commit-author/commit-author.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  type Fetcher,
  type Sleeper,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export const DEPLOYED_COMMIT = "deployedCommit"

export const REFUSED_COMMIT = "refusedCommit"

const DEPLOY_ENDED_AT = "deployEndedAt"

const DEPLOY_REFUSED_AT = "deployRefusedAt"

export async function commitKeptIn(
  pagePath: string,
  key: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<string | null> {
  const named = partedIn(pagePath)
  if (named === null) return null
  const asked = await askingFor(
    { pageTypeSlug: named.pageType, where: { slug: { is: named.slug } } },
    fetcher,
    naps
  )
  if ("refused" in asked) return null
  const kept = asked.rows[0]
  return kept === undefined ? null : textAt({ ...kept }, key)
}

export async function commitRecordedIn(
  pagePath: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<string | null> {
  return await commitKeptIn(pagePath, DEPLOYED_COMMIT, fetcher, naps)
}

export function saidOfNoRecord(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` was put up at ${commit}, and that commit was not kept beside its page, so the next deploy would judge itself against the commit before this one: ${wrong.join("\n")}`
}

export function saidOfNoRefusal(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` refused at ${commit}, and that commit was not kept beside its page, so a loop would try that same commit again: ${wrong.join("\n")}`
}

async function wroteUnder(
  pagePath: string,
  key: string,
  commit: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  if ((await commitKeptIn(pagePath, key, fetcher, naps)) === commit) return []
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

async function momentIn(
  pagePath: string,
  key: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<number | null> {
  const said = await commitKeptIn(pagePath, key, fetcher, naps)
  if (said === null) return null
  const at = Date.parse(said)
  return Number.isFinite(at) ? at : null
}

export async function endedIn(
  pagePath: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<number | null> {
  return await momentIn(pagePath, DEPLOY_ENDED_AT, fetcher, naps)
}

export async function refusedAtIn(
  pagePath: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<number | null> {
  return await momentIn(pagePath, DEPLOY_REFUSED_AT, fetcher, naps)
}

function saidOfNoEnding(slug: string, wrong: readonly string[]): string {
  return `\`${slug}\` was deployed, and the moment that deploy ended was not kept beside its page, so a loop would deploy it again without waiting out its cooldown: ${wrong.join("\n")}`
}

export async function recordedEnding(
  slug: string,
  pagePath: string,
  refused: boolean = false,
  at: Date = new Date(),
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  const said = at.toISOString()
  const wrong = [
    ...(await wroteUnder(pagePath, DEPLOY_ENDED_AT, said, fetcher, naps)),
    ...(refused ? await wroteUnder(pagePath, DEPLOY_REFUSED_AT, said, fetcher, naps) : []),
  ]
  return wrong.length === 0 ? [] : [saidOfNoEnding(slug, wrong)]
}

export async function recordedCommit(
  slug: string,
  pagePath: string,
  commit: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  const wrong = await wroteUnder(pagePath, DEPLOYED_COMMIT, commit, fetcher, naps)
  return wrong.length === 0 ? [] : [saidOfNoRecord(slug, commit, wrong)]
}

export async function recordedRefusal(
  slug: string,
  pagePath: string,
  commit: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<readonly string[]> {
  const wrong = await wroteUnder(pagePath, REFUSED_COMMIT, commit, fetcher, naps)
  return wrong.length === 0 ? [] : [saidOfNoRefusal(slug, commit, wrong)]
}
