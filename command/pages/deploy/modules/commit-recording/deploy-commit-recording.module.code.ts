import { authorIn } from "akasha/command/modules/commit-author/commit-author.module.code.ts"
import { WORKSTATION_SERVICE } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  type Fetcher,
  type Sleeper,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export const DEPLOYED_COMMIT = "deployedCommit"

export const REFUSED_COMMIT = "refusedCommit"

export const DEPLOY_REFUSAL = "deployRefusal"

const MOST_REFUSAL = 4000

const DEPLOY_ENDED_AT = "deployEndedAt"

const DEPLOY_REFUSED_AT = "deployRefusedAt"

export type Keeping =
  | { readonly beside: string }
  | { readonly through: Fetcher | undefined; readonly naps: Sleeper | undefined }

const THROUGH_THE_PAGES: Keeping = { through: undefined, naps: undefined }

export function keepingFor(root: string, kind: string, fetcher?: Fetcher, naps?: Sleeper): Keeping {
  if (kind === WORKSTATION_SERVICE) return { beside: root }
  return { through: fetcher, naps }
}

function besideThePage(root: string, pagePath: string, key: string): string | null {
  const held = uncommittedIn(root, pagePath)
  return held === null ? null : textAt({ ...held }, key)
}

export async function commitKeptIn(
  pagePath: string,
  key: string,
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<string | null> {
  if ("beside" in keeping) return besideThePage(keeping.beside, pagePath, key)
  const named = partedIn(pagePath)
  if (named === null) return null
  const asked = await askingFor(
    { pageTypeSlug: named.pageType, where: { slug: { is: named.slug } } },
    keeping.through,
    keeping.naps
  )
  if ("refused" in asked) return null
  const kept = asked.rows[0]
  return kept === undefined ? null : textAt({ ...kept }, key)
}

export async function commitRecordedIn(
  pagePath: string,
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<string | null> {
  return await commitKeptIn(pagePath, DEPLOYED_COMMIT, keeping)
}

export function saidOfNoRecord(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` was put up at ${commit}, and that commit was not kept beside its page, so the next deploy would judge itself against the commit before this one: ${wrong.join("\n")}`
}

export function saidOfNoRefusal(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` refused at ${commit}, and that commit was not kept beside its page, so a loop would try that same commit again: ${wrong.join("\n")}`
}

function keptBeside(root: string, pagePath: string, key: string, said: string): readonly string[] {
  try {
    mergeUncommitted(root, pagePath, { [key]: said })
    return []
  } catch (thrown) {
    return [thrown instanceof Error ? thrown.message : String(thrown)]
  }
}

async function wroteUnder(
  pagePath: string,
  key: string,
  commit: string,
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<readonly string[]> {
  if ((await commitKeptIn(pagePath, key, keeping)) === commit) return []
  if ("beside" in keeping) return keptBeside(keeping.beside, pagePath, key, commit)
  const wrote = await writingFor(
    {
      writer: authorIn(),
      message: `a deploy keeps ${key} beside ${pagePath}`,
      kept: [{ path: pagePath, values: { [key]: commit } }],
    },
    keeping.through,
    keeping.naps
  )
  return "refused" in wrote ? [wrote.refused] : []
}

async function momentIn(
  pagePath: string,
  key: string,
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<number | null> {
  const said = await commitKeptIn(pagePath, key, keeping)
  if (said === null) return null
  const at = Date.parse(said)
  return Number.isFinite(at) ? at : null
}

export async function endedIn(
  pagePath: string,
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<number | null> {
  return await momentIn(pagePath, DEPLOY_ENDED_AT, keeping)
}

export async function refusedAtIn(
  pagePath: string,
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<number | null> {
  return await momentIn(pagePath, DEPLOY_REFUSED_AT, keeping)
}

function saidOfNoEnding(slug: string, wrong: readonly string[]): string {
  return `\`${slug}\` was deployed, and the moment that deploy ended was not kept beside its page, so a loop would deploy it again without waiting out its cooldown: ${wrong.join("\n")}`
}

export async function recordedEnding(
  slug: string,
  pagePath: string,
  refused: boolean = false,
  at: Date = new Date(),
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<readonly string[]> {
  const said = at.toISOString()
  const wrong = [
    ...(await wroteUnder(pagePath, DEPLOY_ENDED_AT, said, keeping)),
    ...(refused ? await wroteUnder(pagePath, DEPLOY_REFUSED_AT, said, keeping) : []),
  ]
  return wrong.length === 0 ? [] : [saidOfNoEnding(slug, wrong)]
}

export async function recordedCommit(
  slug: string,
  pagePath: string,
  commit: string,
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<readonly string[]> {
  const wrong = await wroteUnder(pagePath, DEPLOYED_COMMIT, commit, keeping)
  return wrong.length === 0 ? [] : [saidOfNoRecord(slug, commit, wrong)]
}

export function refusalKept(why: readonly string[]): string {
  const said = why.join("\n")
  if (said.length <= MOST_REFUSAL) return said
  const cut = ` … cut here, of ${said.length} characters in all … `
  const room = MOST_REFUSAL - cut.length
  const opening = Math.floor(room / 4)
  const closing = room - opening
  return `${said.slice(0, opening)}${cut}${said.slice(said.length - closing)}`
}

export async function recordedRefusal(
  slug: string,
  pagePath: string,
  commit: string,
  why: readonly string[],
  keeping: Keeping = THROUGH_THE_PAGES
): Promise<readonly string[]> {
  const wrong = [
    ...(await wroteUnder(pagePath, REFUSED_COMMIT, commit, keeping)),
    ...(await wroteUnder(pagePath, DEPLOY_REFUSAL, refusalKept(why), keeping)),
  ]
  return wrong.length === 0 ? [] : [saidOfNoRefusal(slug, commit, wrong)]
}
