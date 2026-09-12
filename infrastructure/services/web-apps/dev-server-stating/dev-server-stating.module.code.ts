import type { Dirent } from "node:fs"
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { numberAt, textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { isRecord } from "akasha/utils/narrow/is-record/is-record.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"
import {
  errnoCodeOf,
  pidAliveOrRefuse,
} from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"

export interface DevServerState {
  readonly pid: number
  readonly port: number
  readonly app: string
  readonly seq: number
  readonly worktree_path: string
  readonly started_at: string
  readonly log_path: string
}

const STATE_SHAPE = shape
  .object({
    pid: shape.number(),
    port: shape.number(),
    app: shape.string(),
    seq: shape.number(),
    worktree_path: shape.string(),
    started_at: shape.string(),
    log_path: shape.string(),
  })
  .strict()

export interface DevServerApp {
  readonly name: string
  readonly packagePath: string
  readonly basePort: number
  readonly secretResource: string
}

const WEB_APP = "web-app"

const SLUG = "slug"

const SOURCE_DIRECTORY = "sourceDirectory"

const BASE_PORT = "basePort"

const SECRET_RESOURCE = "secretResource"

type Stated = {
  readonly packagePath: string | null
  readonly basePort: number | null
  readonly secretResource: string | null
}

function statedIn(root: string): ReadonlyMap<string, Stated> {
  const found = new Map<string, Stated>()
  for (const one of valuesOfType(root, WEB_APP)) {
    const slug = textAt(one.value, SLUG)
    if (slug === null) continue
    found.set(slug, {
      packagePath: textAt(one.value, SOURCE_DIRECTORY),
      basePort: numberAt(one.value, BASE_PORT),
      secretResource: textAt(one.value, SECRET_RESOURCE),
    })
  }
  return found
}

export function appNamesIn(root: string): readonly string[] {
  return [...statedIn(root).keys()].sort()
}

export function namingApps(
  refusals: readonly string[],
  root: string,
  said: string
): readonly string[] {
  if (!refusals.some((one) => one.includes(said))) return refusals
  return [...refusals, `the apps there are \`${appNamesIn(root).join("`, `")}\``]
}

export function lookupApp(root: string, name: string): DevServerApp {
  const stated = statedIn(root)
  const said = stated.get(name)
  if (said === undefined) {
    const known = [...stated.keys()].sort().join(", ")
    throw new InputError(`unknown app: ${name} (known: ${known})`)
  }
  if (said.packagePath === null) {
    throw new InputError(`${name} states no source directory, so nothing says what a server runs`)
  }
  if (said.secretResource === null) {
    throw new InputError(`${name} states no secret resource, so nothing says what its values are`)
  }
  if (said.basePort === null) {
    throw new InputError(`${name} states no base port, so nothing says which port a server takes`)
  }
  return {
    name,
    packagePath: said.packagePath,
    basePort: said.basePort,
    secretResource: said.secretResource,
  }
}

export function computePort({ basePort, seq }: { basePort: number; seq: number }): number {
  return basePort + (seq % 100)
}

function projectsRoot(): string {
  return `${homedir()}/projects`
}

export function devServerDir(seq: number): string {
  return `${projectsRoot()}/${seq}/dev-servers`
}

export function devServerLogDir(seq: number): string {
  return `${devServerDir(seq)}/logs`
}

export function stateFilePath(seq: number, app: string): string {
  return `${devServerDir(seq)}/${app}.json`
}

export function logFilePath(seq: number, app: string): string {
  return `${devServerLogDir(seq)}/${app}.log`
}

export function ensureDevServerDirs(seq: number): undefined {
  mkdirSync(devServerLogDir(seq), { recursive: true })
}

export function parseState(raw: string): DevServerState {
  const decoded: unknown = JSON.parse(raw)
  if (!isRecord(decoded)) {
    throw new Error(`dev-server state is not an object: ${raw.slice(0, 200)}`)
  }
  const result = STATE_SHAPE.safeParse(decoded)
  if (!result.success) {
    throw new Error(`dev-server state is missing required fields: ${raw.slice(0, 200)}`)
  }
  return result.data
}

export function writeStateFile(state: DevServerState): undefined {
  ensureDevServerDirs(state.seq)
  writeFileSync(stateFilePath(state.seq, state.app), `${JSON.stringify(state)}\n`, {
    mode: 0o600,
  })
}

export function readStateFile(seq: number, app: string): DevServerState | null {
  const path = stateFilePath(seq, app)
  if (!existsSync(path)) return null
  return parseState(readFileSync(path, "utf8"))
}

function entriesIn(dir: string): readonly Dirent[] | null {
  try {
    return readdirSync(dir, { withFileTypes: true, encoding: "utf8" })
  } catch (err) {
    if (errnoCodeOf(err) === "ENOENT") return null
    throw err
  }
}

export function listStateFiles(): readonly DevServerState[] {
  const root = projectsRoot()
  const projectEntries = entriesIn(root)
  if (projectEntries === null) return []
  const states: DevServerState[] = []
  for (const projectEntry of projectEntries) {
    if (!projectEntry.isDirectory()) continue
    if (!/^\d+$/.test(projectEntry.name)) continue
    const dir = `${root}/${projectEntry.name}/dev-servers`
    const stateEntries = entriesIn(dir)
    if (stateEntries === null) continue
    for (const one of stateEntries) {
      if (!one.isFile()) continue
      if (!one.name.endsWith(".json")) continue
      states.push(parseState(readFileSync(`${dir}/${one.name}`, "utf8")))
    }
  }
  return states
}

export const isPidAlive = pidAliveOrRefuse
