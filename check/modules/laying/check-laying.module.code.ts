import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { basename, dirname, join, normalize } from "node:path"
import { SCRATCH_AT } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export type Laid = {
  readonly from: string
  readonly swept: () => undefined
}

type Bodying = (path: string) => Uint8Array | null

const LAID = "akasha-checks-laid-"

const OWN = "akasha/"

const HERE = "."

const ABOVE = ".."

const TOP = ""

const TS = ".ts"

const CODE = ".code.ts"

const IMPORTED = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)["']([^"']+)["']/g

const TEXT = new TextDecoder()

function typesOf(pages: readonly string[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of pages) {
    const said = partedIn(one)
    if (said !== null) held.add(said.pageType)
  }
  return held
}

function checkFile(path: string, types: ReadonlySet<string>): boolean {
  const said = partedIn(path)
  return said !== null && types.has(said.pageType)
}

function touchedIn(change: Change): ReadonlySet<string> {
  return new Set([...change.changed, ...(change.carried ?? [])])
}

function folderOf(path: string): string {
  const at = dirname(path)
  return at === HERE ? TOP : at
}

function namesIn(at: string): readonly string[] {
  return statSync(at, { throwIfNoEntry: false })?.isDirectory() === true ? readdirSync(at) : []
}

function bodyOver(change: Change, touched: ReadonlySet<string>): Bodying {
  return (path) => {
    if (touched.has(path)) return change.after(path)
    const at = join(change.root, path)
    return statSync(at, { throwIfNoEntry: false })?.isFile() === true ? readFileSync(at) : null
  }
}

function startsIn(root: string, pages: readonly string[], touched: ReadonlySet<string>): string[] {
  const found = new Set<string>()
  for (const page of pages) {
    found.add(page)
    const folder = folderOf(page)
    const stem = `${basename(page).slice(0, -TS.length)}.`
    const beside = namesIn(join(root, folder)).map((one) => join(folder, one))
    for (const at of [...beside, ...touched]) {
      if (folderOf(at) === folder && basename(at).startsWith(stem) && at.endsWith(CODE)) {
        found.add(at)
      }
    }
  }
  return [...found]
}

function importsOf(path: string, body: string): readonly string[] {
  const found: string[] = []
  for (const one of body.matchAll(IMPORTED)) {
    const named = one[1]
    if (named === undefined) continue
    if (named.startsWith(OWN)) found.push(named.slice(OWN.length))
    if (!named.startsWith(HERE)) continue
    const at = normalize(join(folderOf(path), named))
    if (!at.startsWith(ABOVE)) found.push(at)
  }
  return found
}

function walked(starts: string[], bodyOf: Bodying): ReadonlyMap<string, readonly string[]> {
  const held = new Map<string, readonly string[]>()
  for (let at = starts.pop(); at !== undefined; at = starts.pop()) {
    if (held.has(at)) continue
    const body = bodyOf(at)
    if (body === null) continue
    const named = importsOf(at, TEXT.decode(body))
    held.set(at, named)
    starts.push(...named)
  }
  return held
}

function reaching(
  held: ReadonlyMap<string, readonly string[]>,
  touched: ReadonlySet<string>
): ReadonlySet<string> {
  const found = new Set<string>()
  let grew = true
  while (grew) {
    grew = false
    for (const [at, named] of held) {
      if (found.has(at)) continue
      if (!touched.has(at) && !named.some((one) => touched.has(one) || found.has(one))) continue
      found.add(at)
      grew = true
    }
  }
  return found
}

function opened(from: string, root: string, folder: string, made: Set<string>): undefined {
  if (made.has(folder)) return
  const into = join(from, folder)
  if (folder !== TOP) {
    opened(from, root, folderOf(folder), made)
    rmSync(into, { force: true })
    mkdirSync(into)
  }
  for (const one of namesIn(join(root, folder)))
    symlinkSync(join(root, folder, one), join(into, one))
  made.add(folder)
}

function placed(
  from: string,
  root: string,
  path: string,
  body: Uint8Array | null,
  made: Set<string>
): undefined {
  opened(from, root, folderOf(path), made)
  rmSync(join(from, path), { force: true })
  if (body !== null) writeFileSync(join(from, path), body)
}

export function altersChecks(change: Change, pages: readonly string[]): boolean {
  const touched = touchedIn(change)
  const types = typesOf(pages)
  for (const one of touched) if (checkFile(one, types)) return true
  const held = walked(startsIn(change.root, pages, touched), bodyOver(change, touched))
  return reaching(held, touched).size > 0
}

export function laidOut(change: Change, pages: readonly string[]): Laid {
  const touched = touchedIn(change)
  const types = typesOf(pages)
  const bodyOf = bodyOver(change, touched)
  const held = walked(startsIn(change.root, pages, touched), bodyOf)
  const from = mkdtempSync(join(SCRATCH_AT, LAID))
  const swept = (): undefined => {
    rmSync(from, { recursive: true, force: true })
  }
  try {
    const made = new Set<string>()
    opened(from, change.root, TOP, made)
    for (const path of touched) {
      const body = change.after(path)
      if (body === null && checkFile(path, types)) continue
      placed(from, change.root, path, body, made)
    }
    for (const path of reaching(held, touched)) {
      if (!touched.has(path)) placed(from, change.root, path, bodyOf(path), made)
    }
  } catch (thrown) {
    swept()
    throw thrown
  }
  return { from, swept }
}
