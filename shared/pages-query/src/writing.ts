import {
  patchPage as patchPageThere,
  patchPageIfMatch as patchPageIfMatchThere,
  patchRow as patchRowThere,
  patchRows as patchRowsThere,
  patchState as patchStateThere,
  removePage as removePageThere,
  removeRow as removeRowThere,
  writePage as writePageThere,
  writeRow as writeRowThere,
  writeRows as writeRowsThere,
  type Asked,
  type Body,
  type Changing,
  type Compared,
  type Fetcher,
  type Found,
  type Given,
  type Named,
  type Put,
  type QueryAnswer,
  type QueryRow,
  type Read,
  type Sleeper,
  type Value,
  type Written,
} from "@akasha/pages-query"
import { askComposed as askComposedThere } from "@akasha/pages-query/ask"
import { paramsIn } from "../../../readouts/ask-answer.ts"
import type { WriteAct } from "../../../tools/lib/page-landing-judge.ts"
import { answered } from "../../../tools/lib/page-query-answer.ts"
import { written } from "../../../tools/lib/page-query-landing.ts"
import { askedOf, here, standsHere, whyIn } from "./here.ts"
import { pageTypeOf, standingOf } from "./named.ts"
import { askedAsSpelled } from "./store-spelling.ts"

export { patchFiles, readFiles, readPages, removeFiles, writeFiles } from "@akasha/pages-query"

export type {
  Asked,
  Body,
  Changing,
  Compared,
  Fetcher,
  Found,
  Given,
  Named,
  Put,
  QueryAnswer,
  QueryRow,
  Read,
  Sleeper,
  Value,
  Written,
}

const SAYS = "[pages-query]"

async function landed(
  act: WriteAct,
  pageType: string,
  name: string,
  sent: Readonly<Record<string, unknown>>
): Promise<Written> {
  const carried = new Request("http://pages.invalid/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(sent),
  })
  const said = await written(here(), act, pageType, name, carried, SAYS)
  if (said.status !== 200) return { ok: false, why: whyIn(said), status: said.status }
  const at = (said.body as { readonly at?: unknown }).at
  return { ok: true, at: typeof at === "string" ? at : "" }
}

export async function writePage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) return writePageThere(pageType, name, values, writer, fetcher, rest)
  return landed("write", pageType, name, { writer, values })
}

export async function patchPage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) return patchPageThere(pageType, name, values, writer, fetcher, rest)
  return landed("patch", pageType, name, { writer, values })
}

export async function patchState(
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) return patchStateThere(pageType, name, values, writer, fetcher, rest)
  return landed("patch-state", pageType, name, { writer, values })
}

export async function removePage(
  pageType: string,
  name: string,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) return removePageThere(pageType, name, writer, fetcher, rest)
  return landed("remove", pageType, name, { writer })
}

export async function writeRow(
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) {
    return writeRowThere(pageType, parentName, values, writer, fetcher, rest)
  }
  return landed("write-row", pageType, parentName, { writer, values })
}

export async function patchRow(
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) {
    return patchRowThere(pageType, parentName, values, writer, fetcher, rest)
  }
  return landed("patch-row", pageType, parentName, { writer, values })
}

export async function writeRows(
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) {
    return writeRowsThere(pageType, parentName, rows, writer, fetcher, rest)
  }
  return landed("write-row", pageType, parentName, { writer, rows })
}

export async function patchRows(
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) {
    return patchRowsThere(pageType, parentName, rows, writer, fetcher, rest)
  }
  return landed("patch-row", pageType, parentName, { writer, rows })
}

export async function removeRow(
  pageType: string,
  parentName: string,
  named: string,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  if (!standsHere(pageType)) {
    return removeRowThere(pageType, parentName, named, writer, fetcher, rest)
  }
  return landed("remove-row", pageType, parentName, { writer, named })
}

export async function patchPageIfMatch(
  pageType: string,
  name: string,
  key: string,
  expected: string | null,
  values: Readonly<Record<string, Value>>,
  writer: string,
  clear: readonly string[] = [],
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Compared> {
  if (!standsHere(pageType)) {
    return patchPageIfMatchThere(
      pageType,
      name,
      key,
      expected,
      values,
      writer,
      clear,
      fetcher,
      rest
    )
  }
  const sent = {
    writer,
    values,
    "if-key": key,
    ...(expected === null ? { "if-empty": true } : { "if-value": expected }),
    ...(clear.length > 0 ? { clear: [...clear] } : {}),
  }
  const carried = new Request("http://pages.invalid/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(sent),
  })
  const said = await written(here(), "patch-if", pageType, name, carried, SAYS)
  const body = said.body as Readonly<Record<string, unknown>>
  if (said.status !== 200) return { outcome: "failed", why: whyIn(said), status: said.status }
  const outcome = body.outcome
  if (outcome === "won") {
    const at = body.at
    return { outcome: "won", at: typeof at === "string" ? at : String(at ?? "") }
  }
  if (outcome === "lost") {
    return {
      outcome: "lost",
      key: String(body.key ?? key),
      expected: String(body.expected ?? expected ?? ""),
      found: String(body.found ?? ""),
      why: `\`patch-if ${pageType}/${name}\` lost: \`${key}\` reads \`${String(body.found ?? "")}\``,
    }
  }
  return { outcome: "absent", why: String(body.why ?? `no page stands at ${pageType}/${name}`) }
}

async function namedAsked(
  slug: string,
  given: Given,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Asked> {
  const pageType = pageTypeOf(slug)
  const standing = standingOf(slug, given, pageType === null || standsHere(pageType))
  if (standing.where === "refused") return { ok: false, why: standing.why, status: 400 }
  if (standing.where === "there") {
    return askedAsSpelled(standing.query, (asked) => askComposedThere(asked, fetcher, naps))
  }
  return askedOf(answered(here(), slug, paramsIn(given)))
}

export async function askNamed(
  slug: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Asked> {
  return namedAsked(slug, {}, fetcher, naps)
}

export async function askTaking(
  slug: string,
  given: Given,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Asked> {
  return namedAsked(slug, given, fetcher, naps)
}
