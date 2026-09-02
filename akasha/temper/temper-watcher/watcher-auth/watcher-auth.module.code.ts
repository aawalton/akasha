import { randomBytes } from "node:crypto"
import { existsSync, mkdirSync, readFileSync } from "node:fs"
import { createServer, type Server } from "node:http"
import { writeFileAtomicSync } from "@akasha/utils-fs/atomic-write"
import { z } from "zod"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"
import { type PathOpts, watcherConfigDir } from "../watcher-paths/watcher-paths.module.code.ts"

type Env = Readonly<Record<string, string | undefined>>

export const SESSION_STORAGE_KEY = "temper-watcher-session"

export const DEFAULT_SERVER_URL = "https://tempereso.com"

export const CONFIG_FILE_NAME = "config.json"

export const CONFIG_FILE_MODE = 0o600

export const STATE_BYTES = 16

export const CALLBACK_PATH = "/callback"

export const LINK_PATH = "/cli-link"

export const LANDING_PATH = "/watcher"

export const LOOPBACK = "127.0.0.1"

export const AUTH_TIMEOUT_MS = 5 * 60 * 1000

export const NOT_FOUND_STATUS = 404

export const REFUSED_STATUS = 400

export const REDIRECT_STATUS = 302

export const STATE_MISMATCH_BODY =
  "<html><body><h2>State mismatch. Please try again.</h2></body></html>"

export const MISSING_TOKENS_BODY =
  "<html><body><h2>Missing tokens in callback. Please try again.</h2></body></html>"

export const WAITING_MESSAGE = "Waiting for authorization..."

export const NO_LOCAL_SERVER = "Failed to start local auth server"

const CONFIG_SHAPE = z
  .object({
    [SESSION_STORAGE_KEY]: z.string().optional(),
    serverUrl: z.string().optional(),
  })
  .passthrough()

export interface PersistedSession {
  access_token: string
  refresh_token: string
}

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

export function serverUrlFromEnv(env: Env = process.env): string {
  return z.string().default(DEFAULT_SERVER_URL).parse(env.TEMPER_SERVER_URL)
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

export function loadConfig(
  store: ConfigStore = diskConfigStore(),
  fallbackServerUrl: string = serverUrlFromEnv()
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
  const dir = store.dir()
  const path = configPathIn(dir)
  if (!store.exists(dir)) store.makeDir(dir)
  const merged = { ...(heldAt(store, path) ?? {}), ...updates }
  store.writeText(path, JSON.stringify(merged, null, 2))
  return
}

export type CallbackDecision =
  | { kind: "reject"; status: number; body: string }
  | { kind: "accept"; redirectTo: string; session: PersistedSession }

export function decideCallbackResponse(args: {
  searchParams: URLSearchParams
  expectedState: string
  serverUrl: string
}): CallbackDecision {
  const accessToken = args.searchParams.get("access_token")
  const refreshToken = args.searchParams.get("refresh_token")

  if (args.searchParams.get("state") !== args.expectedState) {
    return { kind: "reject", status: REFUSED_STATUS, body: STATE_MISMATCH_BODY }
  }
  if (accessToken == null || refreshToken == null) {
    return { kind: "reject", status: REFUSED_STATUS, body: MISSING_TOKENS_BODY }
  }

  return {
    kind: "accept",
    redirectTo: `${args.serverUrl}${LANDING_PATH}`,
    session: { access_token: accessToken, refresh_token: refreshToken },
  }
}

export function isCallbackPath(pathname: string): boolean {
  return pathname === CALLBACK_PATH
}

export function randomSignInState(): string {
  return randomBytes(STATE_BYTES).toString("hex")
}

export function looksLikeSignInState(value: string): boolean {
  return new RegExp(`^[0-9a-f]{${STATE_BYTES * 2}}$`).test(value)
}

export function signInLinkUrl(args: { serverUrl: string; port: number; state: string }): string {
  const query = `port=${args.port}&state=${encodeURIComponent(args.state)}`
  return `${args.serverUrl}${LINK_PATH}?${query}`
}

export function openLinkMessage(url: string): string {
  return `Open this URL in your browser to link your account: ${url}`
}

export function timedOutMessage(ms: number): string {
  const minutes = ms / 60_000
  return `Authorization timed out after ${minutes} ${minutes === 1 ? "minute" : "minutes"}`
}

export type OpenSignInLink = (url: string) => undefined

export function openNothing(): undefined {
  return
}

export interface AuthenticateDeps {
  readonly serverUrl?: string
  readonly openSignInLink?: OpenSignInLink
  readonly newState?: () => string
  readonly announce?: (message: string) => undefined
  readonly timeoutMs?: number
}

export interface Authenticated {
  readonly session: PersistedSession
  readonly serverUrl: string
}

export function authenticate(deps: AuthenticateDeps = {}): Promise<Authenticated> {
  const serverUrl = deps.serverUrl ?? serverUrlFromEnv()
  const openSignInLink = deps.openSignInLink ?? openNothing
  const announce = deps.announce ?? log
  const timeoutMs = deps.timeoutMs ?? AUTH_TIMEOUT_MS
  const state = (deps.newState ?? randomSignInState)()

  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined

    const server: Server = createServer((req, res) => {
      const url = new URL(req.url ?? "/", `http://${LOOPBACK}`)

      if (!isCallbackPath(url.pathname)) {
        res.writeHead(NOT_FOUND_STATUS)
        res.end()
        return
      }

      const decision = decideCallbackResponse({
        searchParams: url.searchParams,
        expectedState: state,
        serverUrl,
      })

      if (decision.kind === "reject") {
        res.writeHead(decision.status, { "Content-Type": "text/html" })
        res.end(decision.body)
        return
      }

      res.writeHead(REDIRECT_STATUS, { Location: decision.redirectTo })
      res.end()

      if (timer !== undefined) clearTimeout(timer)
      server.close()
      resolve({ session: decision.session, serverUrl })
    })

    server.listen(0, LOOPBACK, () => {
      const address = server.address()
      if (address == null || typeof address === "string") {
        reject(new Error(NO_LOCAL_SERVER))
        return
      }

      const linkUrl = signInLinkUrl({ serverUrl, port: address.port, state })
      announce(openLinkMessage(linkUrl))
      try {
        openSignInLink(linkUrl)
      } catch {}
      announce(WAITING_MESSAGE)

      timer = setTimeout(() => {
        server.close()
        reject(new Error(timedOutMessage(timeoutMs)))
      }, timeoutMs)
    })
  })
}
