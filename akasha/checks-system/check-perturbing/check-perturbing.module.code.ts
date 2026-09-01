import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import type { Change } from "@akasha/pages-system/change"
import { onDisk } from "../change-walking/change-walking.module.code.ts"

export const MARK = "the differential wrote this, and no change describes it"

const APPENDED = `\nexport const differed = ${JSON.stringify(MARK)}\n`

const TS = ".ts"

const TSX = ".tsx"

const JSON_TAIL = ".json"

const MANIFEST = "package.json"

const ELSEWHERE = "elsewhere-"

const SPACES = 2

export type Body = Uint8Array | null

export type Scenario = {
  readonly named: string
  readonly after: ReadonlyMap<string, Body>
}

export function bytesOf(said: string): Uint8Array {
  return new TextEncoder().encode(said)
}

function textAt(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

export function contradicting(path: string): Uint8Array {
  const said = JSON.stringify(MARK)
  if (path.endsWith(TS) || path.endsWith(TSX)) return bytesOf(`export const differed = ${said}\n`)
  if (path.endsWith(JSON_TAIL)) return bytesOf(`{ "differed": ${said} }\n`)
  return bytesOf(`${MARK}\n`)
}

export function bodiesFor(root: string, paths: readonly string[]): ReadonlyMap<string, Body> {
  const found = new Map<string, Body>()
  for (const one of paths) {
    const at = join(root, one)
    found.set(one, existsSync(at) ? readFileSync(at) : null)
  }
  return found
}

export function contradictingOver(held: ReadonlyMap<string, Body>): ReadonlyMap<string, Body> {
  const found = new Map<string, Body>()
  for (const one of held.keys()) found.set(one, contradicting(one))
  return found
}

export function bodiesAs(root: string, held: ReadonlyMap<string, Body>): undefined {
  for (const [path, bytes] of held) {
    const at = join(root, path)
    if (bytes === null) {
      rmSync(at, { force: true })
      continue
    }
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, bytes)
  }
  return undefined
}

export function changeOf(
  root: string,
  before: ReadonlyMap<string, Body>,
  after: ReadonlyMap<string, Body>
): Change {
  const under = onDisk(root)
  const over = onDisk(root)
  return {
    root,
    changed: [...after.keys()].sort(),
    before: (path) => (before.has(path) ? (before.get(path) ?? null) : under(path)),
    after: (path) => (after.has(path) ? (after.get(path) ?? null) : over(path)),
  }
}

type Making = (path: string, root: string) => ReadonlyMap<string, Body>

type Kind = {
  readonly named: string
  readonly taken: (path: string) => boolean
  readonly made: Making
}

const appending: Making = (path, root) =>
  new Map([[path, bytesOf(`${textAt(root, path)}${APPENDED}`)]])

const keying: Making = (path, root) => {
  const held = JSON.parse(textAt(root, path)) as Record<string, unknown>
  const said = JSON.stringify({ ...held, differed: MARK }, null, SPACES)
  return new Map([[path, bytesOf(`${said}\n`)]])
}

const lining: Making = (path, root) =>
  new Map([[path, bytesOf(`${textAt(root, path)}\n${MARK}\n`)]])

const taking: Making = (path) => new Map([[path, null]])

const moving: Making = (path, root) =>
  new Map<string, Body>([
    [path, null],
    [join(dirname(path), `${ELSEWHERE}${basename(path)}`), readFileSync(join(root, path))],
  ])

function tailed(ending: string): (path: string) => boolean {
  return (path) => path.endsWith(ending)
}

function manifested(path: string): boolean {
  return basename(path) === MANIFEST
}

const CODE_TAIL = ".module.code.ts"

const KINDS: readonly Kind[] = [
  { named: "a module's code body", taken: tailed(CODE_TAIL), made: appending },
  { named: "a page", taken: tailed(".module.ts"), made: appending },
  { named: "a package manifest", taken: manifested, made: keying },
  {
    named: "a json that is no manifest",
    taken: (path) => path.endsWith(JSON_TAIL) && !manifested(path),
    made: keying,
  },
  { named: "a shell script", taken: tailed(".sh"), made: lining },
  { named: "a body taken away", taken: tailed(".portrait.md"), made: taking },
  { named: "a body moved", taken: tailed(".test-fixtures.ts"), made: moving },
]

export function scenariosIn(root: string, paths: readonly string[]): readonly Scenario[] {
  const found: Scenario[] = []
  for (const kind of KINDS) {
    const at = paths.find((one) => kind.taken(one))
    if (at === undefined) continue
    found.push({ named: `${kind.named} — ${at}`, after: kind.made(at, root) })
  }
  return found
}

export function relandingOf(root: string, paths: readonly string[]): Scenario {
  return {
    named: `a re-landing of ${paths.length} bodies a check takes as input`,
    after: bodiesFor(root, paths),
  }
}
