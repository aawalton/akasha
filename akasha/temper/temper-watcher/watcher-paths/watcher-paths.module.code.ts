export type PathOpts = {
  readonly platform?: string
  readonly env?: Readonly<Record<string, string | undefined>>
}

type Env = Readonly<Record<string, string | undefined>>

const WINDOWS = "win32"

function envOf(opts?: PathOpts): Env {
  return opts?.env ?? process.env
}

function platformOf(opts?: PathOpts): string {
  return opts?.platform ?? process.platform
}

function stated(env: Env, key: string): string | undefined {
  const held = env[key]
  return held === undefined || held === "" ? undefined : held
}

function demanded(env: Env, key: string): string {
  const held = stated(env, key)
  if (held === undefined) {
    throw new Error(`${key} is unset, so where the temper watcher keeps its files is unknown`)
  }
  return held
}

export function watcherLogDir(opts?: PathOpts): string {
  const env = envOf(opts)
  const named = stated(env, "WATCHER_LOG_DIR")
  if (named !== undefined) return named
  if (platformOf(opts) === WINDOWS) return `${demanded(env, "LOCALAPPDATA")}/TemperWatcher`
  const base = stated(env, "XDG_STATE_HOME") ?? `${demanded(env, "HOME")}/.local/state`
  return `${base}/temper-watcher`
}

export function watcherConfigDir(opts?: PathOpts): string {
  const env = envOf(opts)
  const named = stated(env, "WATCHER_CONFIG_DIR")
  if (named !== undefined) return named
  if (platformOf(opts) === WINDOWS) return `${demanded(env, "APPDATA")}/temper`
  const base = stated(env, "XDG_CONFIG_HOME") ?? `${demanded(env, "HOME")}/.config`
  return `${base}/temper`
}
