export const CARRIED: readonly string[] = ["PATH", "HOME", "TMPDIR", "LANG"]

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
