export const CARRIED: readonly string[] = ["PATH", "HOME", "TMPDIR", "LANG"]

export const RUNNING = "AKASHA_TESTS_RUNNING"

export const MARK = "1"

type HeldLocally = { readonly process?: { readonly env?: Record<string, string | undefined> } }

export function alreadyRunning(): boolean {
  return (globalThis as HeldLocally).process?.env?.[RUNNING] === MARK
}

export function carriedFrom(
  env: Readonly<Record<string, string | undefined>>
): Readonly<Record<string, string>> {
  const held: Record<string, string> = {}
  for (const name of CARRIED) {
    const value = env[name]
    if (value !== undefined) held[name] = value
  }
  return held
}
