import { mayRead } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import {
  alanContributor,
  readAlanUser,
} from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { namedWithin } from "akasha/page/access/modules/answer/answer.module.code.ts"
import { shapeAsked } from "akasha/page/access/modules/file-property-defs/file-property-defs.module.code.ts"
import {
  askedNarrow,
  type Narrow,
  type Reach,
} from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"
import { carriedToStore } from "akasha/page/query/modules/store-carrying/store-carrying.module.code.ts"
import { postingTo } from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"
import { objectIn } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Test } from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"

const ASKED_AT = "/ask"

const ASKED_WHAT = "an ask carried through alanwalton.com"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

const TAKES = "the question is carried as a JSON body"

const NAMES_NO_TYPE = "a question names a page type as `pageTypeSlug`"

const WHERE_IS_OBJECT = "`where` is a JSON object"

const NARROWS_DISAGREE =
  "the accesses reaching this page type and the page types extending it narrow them differently, and one question is held to one narrow; this route refuses rather than widening to the pages every narrow would let through"

const ASKED_PAST_NARROW =
  "the pages asked for lie outside the narrow this reader may read; this route refuses rather than letting the question widen the narrow"

const UNSHAPED =
  "the page types extending the one asked went unread, so which pages the answer would hold is unknown"

const UNREACHED = 502

type Where = Readonly<Record<string, Test>>

type Posting = (path: string, what: string, body: unknown) => ReturnType<typeof postingTo>

export type AskDeps = {
  readonly readerOf: (request: Request) => Promise<object | null>
  readonly mayRead: (user: object | null, pageTypeSlug: string) => Promise<Reach>
  readonly kindsBelow: (pageTypeSlug: string) => Promise<readonly string[]>
  readonly post: Posting
}

const LIVE: AskDeps = {
  readerOf: async (request) => (await readAlanUser(request)).user,
  mayRead,
  kindsBelow: async (pageTypeSlug) => (await shapeAsked(pageTypeSlug))?.below ?? [],
  post: (at, what, body) => postingTo(at, what, body),
}

type Held =
  | { readonly where: Where | undefined }
  | { readonly refused: string; readonly status: number }

function narrowsSaid(narrows: readonly Narrow[]): string {
  return JSON.stringify(narrows.map((one) => [one.key, one.is]).sort())
}

export function narrowOver(reaches: readonly Reach[]): readonly Narrow[] | null | "disagree" {
  let held: readonly Narrow[] | null = null
  for (const one of reaches) {
    if (!one.permitted || one.narrows === null) continue
    if (held === null) held = one.narrows
    else if (narrowsSaid(held) !== narrowsSaid(one.narrows)) return "disagree"
  }
  return held
}

async function kindsOf(pageTypeSlug: string, deps: AskDeps): Promise<readonly string[] | null> {
  try {
    const below = await deps.kindsBelow(pageTypeSlug)
    return [pageTypeSlug, ...below.filter((one) => one !== pageTypeSlug)]
  } catch (thrown) {
    console.warn(`[alan-answer-ask] ${UNSHAPED}: ${String(thrown)}`)
    return null
  }
}

async function heldWhere(
  user: object | null,
  pageTypeSlug: string,
  where: Where | undefined,
  deps: AskDeps
): Promise<Held> {
  const kinds = await kindsOf(pageTypeSlug, deps)
  if (kinds === null) return { refused: UNSHAPED, status: 503 }
  const reaches = await Promise.all(kinds.map((one) => deps.mayRead(user, one)))
  for (const one of reaches) if (!one.permitted) return { refused: one.why, status: 403 }
  const narrows = narrowOver(reaches)
  if (narrows === "disagree") return { refused: NARROWS_DISAGREE, status: 403 }
  const narrowed = askedNarrow(narrows)
  if (narrowed === null) return { refused: NARROWS_DISAGREE, status: 403 }
  const held = namedWithin(narrowed, where)
  if (held === null) return { refused: ASKED_PAST_NARROW, status: 403 }
  return { where: held }
}

export async function askHeld(request: Request, deps: AskDeps = LIVE): Promise<Response> {
  const user = await deps.readerOf(request)
  if (user === null) return Response.json({ error: SIGNED_IN_ONLY }, { status: 401 })
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: TAKES }, { status: 400 })
  }
  const asked = objectIn(body)
  const pageTypeSlug = asked?.pageTypeSlug
  if (asked === null || typeof pageTypeSlug !== "string" || pageTypeSlug === "") {
    return Response.json({ refused: NAMES_NO_TYPE }, { status: 400 })
  }
  const where = asked.where === undefined ? undefined : objectIn(asked.where)
  if (where === null) return Response.json({ refused: WHERE_IS_OBJECT }, { status: 400 })
  const held = await heldWhere(user, pageTypeSlug, where as Where | undefined, deps)
  if ("refused" in held) return Response.json({ refused: held.refused }, { status: held.status })
  const sent = held.where === undefined ? asked : { ...asked, where: held.where }
  const reached = await deps.post(ASKED_AT, ASKED_WHAT, sent)
  if (!reached.ok) {
    return Response.json({ refused: reached.why }, { status: reached.status ?? UNREACHED })
  }
  return Response.json(reached.body)
}

async function alanSignedIn(request: Request): Promise<boolean> {
  return (await alanContributor(request)) !== null
}

export async function answerAsk(request: Request): Promise<Response> {
  return askHeld(request)
}

export async function answerShape(request: Request): Promise<Response> {
  return carriedToStore(request, "/shape", "a shape asked through alanwalton.com", alanSignedIn)
}
