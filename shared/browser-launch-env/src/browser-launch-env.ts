export const BROWSER_LAUNCH_ENV_ALLOWLIST = ["PATH", "HOME"] as const

type EnvSource = Record<string, string | undefined>

export function buildBrowserLaunchEnv(base: EnvSource): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of BROWSER_LAUNCH_ENV_ALLOWLIST) {
    const value = base[key]
    if (value !== undefined) out[key] = value
  }
  return out
}

export function buildBrowserLaunchEnvIArgs(base: EnvSource): readonly string[] {
  const env = buildBrowserLaunchEnv(base)
  return ["-i", ...Object.entries(env).map(([key, value]) => `${key}=${value}`)]
}
