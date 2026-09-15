const SERVED_AT = "build"
const TOLD_BY = "BUILD_DIRECTORY"

export type Told = Record<string, string | undefined>

export function buildDirectoryAt(told: Told = process.env): string {
  const held = told[TOLD_BY]
  if (held === undefined || held.trim() === "") return SERVED_AT
  return held
}
