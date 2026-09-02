import { existsSync, mkdirSync, readFileSync } from "node:fs"
import { writeFileAtomicSync } from "@akasha/utils-fs/atomic-write"
import { z } from "zod"
import { type PathOpts, watcherConfigDir } from "../watcher-paths/watcher-paths.module.code.ts"

export const SESSION_STORAGE_KEY = "temper-watcher-session"

export const CONFIG_FILE_NAME = "config.json"

export const CONFIG_FILE_MODE = 0o600

const CONFIG_SHAPE = z
  .object({
    [SESSION_STORAGE_KEY]: z.string().optional(),
    serverUrl: z.string().optional(),
  })
  .passthrough()

export interface SessionConfig {
  "temper-watcher-session"?: string
  serverUrl: string
}

export interface ConfigStore {
  readonly dir: () => string
  readonly exists: (path: string) => boolean
  readonly readText: (path: string) => string
  readonly makeDir: (path: string) => undefined
  readonly writeText: (path: string, body: string) => undefined
}

export interface KeyedStore {
  readonly getItem: (key: string) => string | null
  readonly setItem: (key: string, value: string) => undefined
  readonly removeItem: (key: string) => undefined
}

export function configPathIn(dir: string): string {
  return `${dir}/${CONFIG_FILE_NAME}`
}

export function diskConfigStore(opts?: PathOpts): ConfigStore {
  return {
    dir: () => watcherConfigDir(opts),
    exists: (path) => existsSync(path),
    readText: (path) => readFileSync(path, "utf-8"),
    makeDir: (path) => {
      mkdirSync(path, { recursive: true })
      return
    },
    writeText: (path, body) => writeFileAtomicSync(path, body, { mode: CONFIG_FILE_MODE }),
  }
}

export function getConfigPath(store: ConfigStore = diskConfigStore()): string {
  return configPathIn(store.dir())
}

function heldAt(store: ConfigStore, path: string): Record<string, unknown> | null {
  if (!store.exists(path)) return null
  try {
    return CONFIG_SHAPE.parse(JSON.parse(store.readText(path)))
  } catch {
    return null
  }
}

function writeAll(store: ConfigStore, body: Readonly<Record<string, unknown>>): undefined {
  const dir = store.dir()
  if (!store.exists(dir)) store.makeDir(dir)
  store.writeText(configPathIn(dir), JSON.stringify(body, null, 2))
  return
}

function mergeInto(store: ConfigStore, updates: Readonly<Record<string, unknown>>): undefined {
  const held = heldAt(store, configPathIn(store.dir())) ?? {}
  return writeAll(store, { ...held, ...updates })
}

export function loadConfig(
  fallbackServerUrl: string,
  store: ConfigStore = diskConfigStore()
): SessionConfig | null {
  const held = heldAt(store, configPathIn(store.dir()))
  if (held === null) return null
  const session = held[SESSION_STORAGE_KEY]
  const serverUrl = held.serverUrl
  return {
    [SESSION_STORAGE_KEY]: typeof session === "string" ? session : undefined,
    serverUrl: typeof serverUrl === "string" ? serverUrl : fallbackServerUrl,
  }
}

export function saveConfig(
  updates: Partial<SessionConfig>,
  store: ConfigStore = diskConfigStore()
): undefined {
  return mergeInto(store, updates)
}

export function readConfigKey(key: string, store: ConfigStore = diskConfigStore()): string | null {
  const held = heldAt(store, configPathIn(store.dir()))
  const value = held?.[key]
  return typeof value === "string" ? value : null
}

export function writeConfigKey(
  key: string,
  value: string,
  store: ConfigStore = diskConfigStore()
): undefined {
  return mergeInto(store, { [key]: value })
}

export function removeConfigKey(key: string, store: ConfigStore = diskConfigStore()): undefined {
  const held = heldAt(store, configPathIn(store.dir()))
  if (held === null) return
  if (!(key in held)) return
  const rest: Record<string, unknown> = { ...held }
  delete rest[key]
  return writeAll(store, rest)
}

export function sessionFileStore(store: ConfigStore = diskConfigStore()): KeyedStore {
  return {
    getItem: (key) => readConfigKey(key, store),
    setItem: (key, value) => writeConfigKey(key, value, store),
    removeItem: (key) => removeConfigKey(key, store),
  }
}
