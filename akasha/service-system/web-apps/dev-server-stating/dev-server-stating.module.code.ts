import type { Dirent } from "node:fs"
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { InputError } from "@akasha/errors-core/exit-code"
import { errnoCodeOf, pidAliveOrRefuse } from "@akasha/utils-process/pid-signal"
import { shape } from "@tools/lib/shape"

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
  readonly extraDevArgs: readonly string[]
  readonly devCommand: readonly string[]
}

const APP_REGISTRY: Readonly<Record<string, DevServerApp>> = Object.freeze({
  alanwalton: {
    name: "alanwalton",
    packagePath: "akasha/alan/web",
    basePort: 3000,
    extraDevArgs: [],
    devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"],
  },
  audhdalan: {
    name: "audhdalan",
    packagePath: "akasha/audhdalan/audhdalan-web",
    basePort: 3100,
    extraDevArgs: [],
    devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"],
  },
  temper: {
    name: "temper",
    packagePath: "akasha/temper/temper-web",
    basePort: 3300,
    extraDevArgs: [],
    devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"],
  },
  "archive-of-worlds": {
    name: "archive-of-worlds",
    packagePath: "akasha/archive-of-worlds/archive-of-worlds-web",
    basePort: 3500,
    extraDevArgs: [],
    devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"],
  },
  atlas: {
    name: "atlas",
    packagePath: "akasha/alan/atlas-web",
    basePort: 3600,
    extraDevArgs: [],
    devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"],
  },
})

export const APP_NAMES: readonly string[] = Object.freeze(Object.keys(APP_REGISTRY))

export async function lookupApp(name: string): Promise<DevServerApp> {
  const app = APP_REGISTRY[name]
  if (!app) {
    throw new InputError(`unknown app: ${name} (known: ${APP_NAMES.join(", ")})`)
  }
  return app
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
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
