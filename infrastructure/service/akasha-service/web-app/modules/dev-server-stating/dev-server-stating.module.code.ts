import type { Dirent } from "node:fs"
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import {
  InputError,
  operationalError,
} from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  errnoCodeOf,
  pidAliveOrRefuse,
} from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import {
  listedAt,
  slugsOfType,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export interface DevServerState {
  readonly pid: number
  readonly port: number
  readonly app: string
  readonly commit: string
  readonly tree_path: string
  readonly started_at: string
  readonly log_path: string
}

const STATE_SHAPE = SHAPE.object({
  pid: SHAPE.number(),
  port: SHAPE.number(),
  app: SHAPE.string(),
  commit: SHAPE.string(),
  tree_path: SHAPE.string(),
  started_at: SHAPE.string(),
  log_path: SHAPE.string(),
}).strict()

export interface DevServerApp {
  readonly name: string
  readonly packagePath: string
  readonly basePort: number
  readonly secretResource: string
}

const WEB_APP = "web-app"

const SOURCE_DIRECTORY = "sourceDirectory"

const BASE_PORT = "basePort"

const SECRET_RESOURCE = "secretResource"

type Stated = {
  readonly packagePath: string | null
  readonly basePort: number | null
  readonly secretResource: string | null
}

function statedAt(root: string, slug: string): Stated | null {
  const listed = listedAt(root, WEB_APP, slug)[0]
  if (listed === undefined) return null
  const value = valueByPath(root, listed.path)
  if (value === null) return null
  return {
    packagePath: textAt(value, SOURCE_DIRECTORY),
    basePort: numberAt(value, BASE_PORT),
    secretResource: textAt(value, SECRET_RESOURCE),
  }
}

export function appNamesIn(root: string): readonly string[] {
  return slugsOfType(root, WEB_APP)
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
  const said = statedAt(root, name)
  if (said === null) {
    throw new InputError(`unknown app: ${name} (known: ${appNamesIn(root).join(", ")})`)
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

const PORT_TRIES = 100

const PORT_PROBE = {
  data(): undefined {
    return undefined
  },
}

function portFree(port: number): boolean {
  try {
    Bun.listen({ hostname: "127.0.0.1", port, socket: PORT_PROBE }).stop(true)
    return true
  } catch {
    return false
  }
}

export function freePortFrom(basePort: number): number {
  const last = basePort + PORT_TRIES - 1
  for (let port = basePort; port <= last; port += 1) {
    if (portFree(port)) return port
  }
  throw operationalError(
    `every port from ${String(basePort)} to ${String(last)} is taken, so no dev server has one`
  )
}

function projectsRoot(): string {
  return `${homedir()}/projects`
}

function devServerDir(commit: string): string {
  return `${projectsRoot()}/${commit}/dev-servers`
}

function devServerLogDir(commit: string): string {
  return `${devServerDir(commit)}/logs`
}

export function stateFilePath(commit: string, app: string): string {
  return `${devServerDir(commit)}/${app}.json`
}

export function logFilePath(commit: string, app: string): string {
  return `${devServerLogDir(commit)}/${app}.log`
}

export function ensureDevServerDirs(commit: string): undefined {
  mkdirSync(devServerLogDir(commit), { recursive: true })
}

function parseState(raw: string): DevServerState {
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
  ensureDevServerDirs(state.commit)
  writeFileSync(stateFilePath(state.commit, state.app), `${JSON.stringify(state)}\n`, {
    mode: 0o600,
  })
}

export function readStateFile(commit: string, app: string): DevServerState | null {
  const path = stateFilePath(commit, app)
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

const COMMIT_NAMED = /^[0-9a-f]{40}$/

function statesUnder(dir: string): readonly DevServerState[] {
  const stateEntries = entriesIn(dir)
  if (stateEntries === null) return []
  const states: DevServerState[] = []
  for (const one of stateEntries) {
    if (!one.isFile()) continue
    if (!one.name.endsWith(".json")) continue
    states.push(parseState(readFileSync(`${dir}/${one.name}`, "utf8")))
  }
  return states
}

export function statesFor(commit: string): readonly DevServerState[] {
  return statesUnder(devServerDir(commit))
}

export function listStateFiles(): readonly DevServerState[] {
  const root = projectsRoot()
  const commitEntries = entriesIn(root)
  if (commitEntries === null) return []
  const states: DevServerState[] = []
  for (const commitEntry of commitEntries) {
    if (!commitEntry.isDirectory()) continue
    if (!COMMIT_NAMED.test(commitEntry.name)) continue
    states.push(...statesUnder(`${root}/${commitEntry.name}/dev-servers`))
  }
  return states
}

export const isPidAlive = pidAliveOrRefuse
