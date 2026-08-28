import { GATED, refusalsOver } from "../../patches/patch.ts"
import { patchAside } from "../../repo/land/body-aside.ts"
import { type Landed, type Landing, LandingRefused, landFiles } from "../../repo/land/land.ts"
import { AKASHA } from "../../repo/roots/roots.ts"
import type { Value } from "../formula/formula.ts"
import { pageTypeOf } from "../page-type/page-type.ts"
import type { Declared } from "../query/query.ts"
import type { Repo } from "../read/address.ts"
import { besideOf, textAt } from "../read/files.ts"
import { pageWith } from "./page.ts"
import { standingPageAt } from "./standing.ts"

export type Putting = {
  readonly repo: Repo
  readonly at: string
  readonly pageType: string
  readonly declared: Declared
  readonly setting: Readonly<Record<string, Value>>
  readonly body: string | null
  readonly by: string | null
  readonly now: number
  readonly random: () => number
}

export type Taking = {
  readonly repo: Repo
  readonly at: string
  readonly by: string | null
}

export type Written =
  | {
      readonly kind: "written"
      readonly at: string
      readonly wrote: readonly string[]
      readonly gone: readonly string[]
      readonly sha: string | null
    }
  | { readonly kind: "refused"; readonly why: string }

const MARK = String.fromCharCode(96)

const PAGE = "page"

const NOWHERE: ReadonlyMap<string, string> = new Map()

const quoted = (at: string): string => MARK + at + MARK

const refused = (why: string): Written => ({ kind: "refused", why })

const nameOf = (at: string): string => {
  const cut = at.lastIndexOf("/")
  return cut < 0 ? at : at.slice(cut + 1)
}

const messageFor = (kind: string, act: string, at: string, by: string | null): string =>
  `${kind}: ${act} ${at}${by === null ? "" : ` for ${by}`}`

const judged = (
  repo: Repo,
  entries: readonly Landing[],
  removing: readonly string[]
): string | null => {
  if (repo.repo !== AKASHA) return null
  if (process.env[GATED] === "1") return null
  const patch = patchAside(entries, [], removing, repo.root)
  if (patch.trim() === "") return null
  const said = refusalsOver(patch, repo.root, [], NOWHERE)
  return said.length === 0 ? null : said.join("\n")
}

const landing = (
  repo: Repo,
  at: string,
  entries: readonly Landing[],
  removing: readonly string[],
  message: string
): Written => {
  const why = judged(repo, entries, removing)
  if (why !== null) return refused(why)
  let landed: Landed
  try {
    landed = landFiles({
      repo: repo.repo,
      root: repo.root,
      message,
      entries,
      removing,
      mechanical: true,
    })
  } catch (thrown) {
    if (thrown instanceof LandingRefused) return refused(thrown.message)
    throw thrown
  }
  return { kind: "written", at, wrote: landed.wrote, gone: landed.gone, sha: landed.sha }
}

export const putPage = (putting: Putting): Written => {
  const standing = standingPageAt(putting.repo.root, putting.at)
  if (standing.kind === "unreadable") {
    return refused(
      `${quoted(putting.at)} could not be read, and nothing may be written over a page that cannot be read: ${standing.why}`
    )
  }
  const held = standing.kind === "standing" ? standing.parts : null
  const front = pageWith({
    pageType: putting.pageType,
    declared: putting.declared,
    setting: putting.setting,
    body: putting.body ?? (held === null ? "" : held.body),
    standing: held === null ? null : held.stated,
    now: putting.now,
    random: putting.random,
  })
  if (front.kind === "refused") return refused(front.why)
  return landing(
    putting.repo,
    putting.at,
    [{ relPath: putting.at, body: front.text }],
    [],
    messageFor(putting.pageType, "write", putting.at, putting.by)
  )
}

export const takePage = (taking: Taking): Written => {
  let text: string | null
  try {
    text = textAt(taking.repo.root, taking.at)
  } catch (why) {
    return refused(
      `${quoted(taking.at)} could not be read, so nothing here can say what would go with it: ${why instanceof Error ? why.message : String(why)}`
    )
  }
  if (text === null) {
    return refused(`no page is at ${quoted(taking.at)}, so there is nothing to take away`)
  }
  const beside = besideOf(taking.repo.root, taking.at)
  if (typeof beside === "string") {
    return refused(
      `a page goes with the files beside it, and what is beside ${quoted(taking.at)} could not be listed: ${beside}`
    )
  }
  return landing(
    taking.repo,
    taking.at,
    [],
    [taking.at, ...beside],
    messageFor(pageTypeOf(nameOf(taking.at)) ?? PAGE, "take", taking.at, taking.by)
  )
}
