// The write half of this package with the local-checkout branch severed.
//
// This module was a local-first facade: it landed a write into the checkout on this machine
// when `standsHere(pageType)`, and otherwise sent it to the store over HTTP. Reaching the
// checkout meant importing `./here.ts`, and through it the `tools/lib` page engine, which
// answers by shelling out to `git` synchronously once per page type. That sweep is what
// killed the web pods: no `await` yields out of it.
//
// Every act here now goes to the store. Where the store refuses, the refusal is what a caller
// gets, in place of a write that quietly landed by another road.
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

export async function writePage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return writePageThere(pageType, name, values, writer, fetcher, rest)
}

export async function patchPage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return patchPageThere(pageType, name, values, writer, fetcher, rest)
}

export async function patchState(
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return patchStateThere(pageType, name, values, writer, fetcher, rest)
}

export async function removePage(
  pageType: string,
  name: string,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return removePageThere(pageType, name, writer, fetcher, rest)
}

export async function writeRow(
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return writeRowThere(pageType, parentName, values, writer, fetcher, rest)
}

export async function patchRow(
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return patchRowThere(pageType, parentName, values, writer, fetcher, rest)
}

export async function writeRows(
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return writeRowsThere(pageType, parentName, rows, writer, fetcher, rest)
}

export async function patchRows(
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return patchRowsThere(pageType, parentName, rows, writer, fetcher, rest)
}

export async function removeRow(
  pageType: string,
  parentName: string,
  named: string,
  writer: string,
  fetcher?: Fetcher,
  rest?: Sleeper
): Promise<Written> {
  return removeRowThere(pageType, parentName, named, writer, fetcher, rest)
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

// A saved query is a file in the checkout, read by the engine this package no longer reaches.
// Nothing answers one now. The refusal names where the question belongs so that a caller reading
// it is pointed at the service rather than left to guess why an answer went empty.
const NO_SAVED_QUERY =
  "a saved query is answered by the page engine that has been removed. ask `@akasha/pages-system-service/calling` for the rows and reduce them where you need them"

export async function askNamed(
  slug: string,
  _fetcher?: Fetcher,
  _naps?: Sleeper
): Promise<Asked> {
  return { ok: false, why: `\`${slug}\`: ${NO_SAVED_QUERY}`, status: 501 }
}

export async function askTaking(
  slug: string,
  _given: Given,
  _fetcher?: Fetcher,
  _naps?: Sleeper
): Promise<Asked> {
  return { ok: false, why: `\`${slug}\`: ${NO_SAVED_QUERY}`, status: 501 }
}
