import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, isAbsolute, join, relative } from "node:path"
import type { Entry, Value } from "./index-entries.module.code.ts"
import {
  filePropertiesAt,
  filePropertiesIn,
  identityIn,
  importIn,
  knownIn,
  linesIn,
  loadedFrom,
  NAMED,
  NOTHING_FILED,
  pageTyped,
  pageTypesIn,
  relationIn,
  schemaIn,
  valueAt,
} from "./index-entries.module.code.ts"
import { stampBuilt, stampSettled } from "./index-stamp.module.code.ts"

function pruneAbove(at: string, root: string): void {
  let here = at
  while (here !== root && here.startsWith(root)) {
    try {
      rmdirSync(here)
    } catch {
      return
    }
    here = dirname(here)
  }
}

function keepWhole(at: string, lines: readonly string[], root: string): void {
  if (lines.length === 0) {
    if (existsSync(at)) rmSync(at)
    pruneAbove(dirname(at), root)
    return
  }
  mkdirSync(dirname(at), { recursive: true })
  const near = `${at}.${process.pid}.part`
  writeFileSync(near, `${lines.join("\n")}\n`)
  renameSync(near, at)
}

type Pending = {
  readonly before: string | null
  readonly after: string | null
}

function keyOf(one: Entry): string {
  return `${one.at} ${one.line}`
}

function settleOver(root: string, was: readonly Entry[], now: readonly Entry[]): void {
  const withdrawn = new Map<string, Set<string>>()
  const added = new Map<string, Set<string>>()
  const kept = new Set(now.map(keyOf))
  for (const gone of was) {
    if (kept.has(keyOf(gone))) continue
    const held = withdrawn.get(gone.at) ?? new Set<string>()
    held.add(gone.line)
    withdrawn.set(gone.at, held)
  }
  for (const come of now) {
    const held = added.get(come.at) ?? new Set<string>()
    held.add(come.line)
    added.set(come.at, held)
  }
  for (const at of new Set([...withdrawn.keys(), ...added.keys()])) {
    const full = join(root, at)
    const gone = withdrawn.get(at) ?? new Set<string>()
    const come = added.get(at) ?? new Set<string>()
    const lines = [...linesIn(full)].filter((one) => !gone.has(one))
    for (const one of come) if (!lines.includes(one)) lines.push(one)
    keepWhole(full, [...lines].sort(), root)
  }
}

function pageShaped(path: string, fileProperties: ReadonlySet<string>): boolean {
  const said = NAMED.exec(path.slice(path.lastIndexOf("/") + 1))
  return said !== null && said[2] !== undefined && !fileProperties.has(said[2])
}

function pagesUnder(tree: string): readonly string[] {
  const named = NAMED
  const found: string[] = []
  const walk = (at: string): void => {
    for (const one of readdirSync(at, { withFileTypes: true })) {
      const here = join(at, one.name)
      if (one.isDirectory()) walk(here)
      else if (named.test(one.name)) found.push(here)
    }
  }
  walk(tree)
  const pageTypes = new Set<string>(["page-type"])
  for (const one of found) {
    const said = named.exec(one.slice(one.lastIndexOf("/") + 1))
    if (said !== null && said[2] === "page-type" && said[1] !== undefined) pageTypes.add(said[1])
  }
  return found.filter((one) => {
    const said = named.exec(one.slice(one.lastIndexOf("/") + 1))
    return said !== null && said[2] !== undefined && pageTypes.has(said[2])
  })
}

const TS = ".ts"

function bodiesUnder(tree: string): readonly string[] {
  const found: string[] = []
  const walk = (at: string): void => {
    for (const one of readdirSync(at, { withFileTypes: true })) {
      const here = join(at, one.name)
      if (one.isDirectory()) walk(here)
      else if (one.name.endsWith(TS)) found.push(here)
    }
  }
  walk(tree)
  return found
}

function filesUnder(at: string): readonly string[] {
  if (!existsSync(at)) return []
  const found: string[] = []
  const walk = (here: string): void => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) walk(next)
      else found.push(next)
    }
  }
  walk(at)
  return found
}

function reconcile(under: string, entries: readonly Entry[], root: string): void {
  const wanted = new Map<string, Set<string>>()
  for (const one of entries) {
    const held = wanted.get(one.at) ?? new Set<string>()
    held.add(one.line)
    wanted.set(one.at, held)
  }
  for (const one of filesUnder(under)) {
    if (!wanted.has(one.slice(root.length + 1))) keepWhole(one, [], root)
  }
  for (const [at, lines] of wanted) keepWhole(join(root, at), [...lines].sort(), root)
}

export type Indexing = {
  readonly wrote: (path: string, body: string, before: string | null) => void
  readonly took: (path: string, before: string | null) => void
  readonly settle: () => readonly string[]
}

export function rebuiltFrom(
  tree: string,
  root: string,
  repo: string
): { readonly pages: number; readonly entries: number; readonly refused: readonly string[] } {
  const held: { readonly path: string; readonly value: Value }[] = []
  for (const path of pagesUnder(tree)) {
    const value = valueAt(path, repo)
    if (value !== null) held.push({ path, value })
  }
  const fileProperties = filePropertiesIn(held.map((one) => one.value))
  const identity = held.flatMap((one) => identityIn(one.value, one.path, repo, fileProperties))
  reconcile(join(root, "identity"), identity, root)
  const schema = held.flatMap((one) => schemaIn(one.value))
  reconcile(join(root, "schema"), schema, root)
  const known = knownIn(root, repo)
  const filed = held.map((one) => relationIn(one.value, one.path, known, repo))
  const relation = filed.flatMap((one) => one.entries)
  reconcile(join(root, "relation"), relation, root)
  const imported = bodiesUnder(tree).flatMap((path) =>
    importIn(readFileSync(path, "utf8"), path, repo)
  )
  reconcile(join(root, "import"), imported, root)
  stampBuilt(repo, tree, root)
  return {
    pages: held.length,
    entries: identity.length + schema.length + relation.length + imported.length,
    refused: filed.flatMap((one) => one.refused),
  }
}

export function indexingAt(root: string, repo: string): Indexing {
  const pending = new Map<string, Pending>()

  const note = (path: string, before: string | null, after: string | null): void => {
    const held = pending.get(path)
    pending.set(path, { before: held === undefined ? before : held.before, after })
  }

  return {
    wrote: (path, body, before) => note(path, before, body),
    took: (path, before) => note(path, before, null),
    settle: () => {
      const pageTypes = pageTypesIn(root)
      const filed = filePropertiesAt(root)
      const noted: string[] = []
      const readInto = (body: string | null, path: string): Value | null => {
        if (body === null || !pageShaped(path, filed)) return null
        const loaded = loadedFrom(body)
        if (loaded.failed !== null && pageTyped(path, pageTypes)) {
          noted.push(`${path}: its body did not load, so it is not indexed — ${loaded.failed}`)
        }
        return loaded.value
      }

      const held = [...pending].map(([path, one]) => ({
        path,
        before: one.before,
        after: one.after,
        was: readInto(one.before, path),
        now: readInto(one.after, path),
      }))
      pending.clear()

      settleOver(
        root,
        held.flatMap((one) => (one.before === null ? [] : importIn(one.before, one.path, repo))),
        held.flatMap((one) => (one.after === null ? [] : importIn(one.after, one.path, repo)))
      )

      const fileProperties = new Set<string>([
        ...filed,
        ...filePropertiesIn(held.flatMap((one) => (one.now === null ? [] : [one.now]))),
      ])
      settleOver(
        root,
        held.flatMap((one) =>
          one.was === null ? [] : identityIn(one.was, one.path, repo, fileProperties)
        ),
        held.flatMap((one) =>
          one.now === null ? [] : identityIn(one.now, one.path, repo, fileProperties)
        )
      )
      settleOver(
        root,
        held.flatMap((one) => (one.was === null ? [] : schemaIn(one.was))),
        held.flatMap((one) => (one.now === null ? [] : schemaIn(one.now)))
      )

      const known = knownIn(root, repo)
      const was = held.map((one) =>
        one.was === null ? NOTHING_FILED : relationIn(one.was, one.path, known, repo)
      )
      const now = held.map((one) =>
        one.now === null ? NOTHING_FILED : relationIn(one.now, one.path, known, repo)
      )
      settleOver(
        root,
        was.flatMap((one) => one.entries),
        now.flatMap((one) => one.entries)
      )

      stampSettled(
        repo,
        root,
        held.map((one) => (isAbsolute(one.path) ? relative(repo, one.path) : one.path))
      )
      return [...noted, ...now.flatMap((one) => one.refused)]
    },
  }
}
