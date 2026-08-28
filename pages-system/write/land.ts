import type { Value } from "../formula/formula.ts"
import { pageTypeOf } from "../page-type/page-type.ts"
import type { Declared } from "../query/query.ts"
import type { Repo } from "../read/address.ts"
import { besideOf, textAt } from "../read/files.ts"
import { type Asked, landsBy } from "./landing.ts"
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
  | { readonly kind: "refused"; readonly at: string; readonly why: string }

const MARK = String.fromCharCode(96)

const quoted = (at: string): string => MARK + at + MARK

const refused = (at: string, why: string): Written => ({ kind: "refused", at, why })

const brokenAs = (why: unknown): string => (why instanceof Error ? why.message : String(why))

const nameOf = (at: string): string => {
  const cut = at.lastIndexOf("/")
  return cut < 0 ? at : at.slice(cut + 1)
}

const messageFor = (kind: string, act: string, at: string, by: string | null): string =>
  `${kind}: ${act} ${at}${by === null ? "" : ` for ${by}`}`

const landing = (asked: Asked, at: string): Written => {
  const answer = landsBy(asked)
  if ("refused" in answer) return refused(at, answer.refused)
  return { kind: "written", at, wrote: answer.wrote, gone: answer.gone, sha: answer.sha }
}

export const putPage = (putting: Putting): Written => {
  const standing = standingPageAt(putting.repo.root, putting.at)
  if (standing.kind === "unreadable") {
    return refused(
      putting.at,
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
  if (front.kind === "refused") return refused(putting.at, front.why)
  return landing(
    {
      repo: putting.repo.repo,
      root: putting.repo.root,
      message: messageFor(putting.pageType, "write", putting.at, putting.by),
      entries: [{ relPath: putting.at, body: front.text }],
      removing: [],
    },
    putting.at
  )
}

export const takePage = (taking: Taking): Written => {
  const kind = pageTypeOf(nameOf(taking.at))
  if (kind === null) {
    return refused(
      taking.at,
      `${quoted(taking.at)} names no page type, so nothing here may take it away`
    )
  }
  let text: string | null
  try {
    text = textAt(taking.repo.root, taking.at)
  } catch (why) {
    return refused(
      taking.at,
      `${quoted(taking.at)} could not be read, so nothing here can say what would go with it: ${brokenAs(why)}`
    )
  }
  if (text === null) {
    return refused(taking.at, `no page is at ${quoted(taking.at)}, so there is nothing to take away`)
  }
  const beside = besideOf(taking.repo.root, taking.at)
  if (typeof beside === "string") {
    return refused(
      taking.at,
      `a page goes with the files beside it, and what is beside ${quoted(taking.at)} could not be listed: ${beside}`
    )
  }
  const files = beside.filter((one) => pageTypeOf(nameOf(one)) === null)
  return landing(
    {
      repo: taking.repo.repo,
      root: taking.repo.root,
      message: messageFor(kind, "take", taking.at, taking.by),
      entries: [],
      removing: [taking.at, ...files],
    },
    taking.at
  )
}
