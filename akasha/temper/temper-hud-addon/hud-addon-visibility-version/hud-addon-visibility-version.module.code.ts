export const VISIBILITY_VERSION_BASELINE = 1
export const VISIBILITY_VERSION_CURRENT = 2

export function coerceStoredBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

export function needsFrameMigration(version: unknown): boolean {
  return !(typeof version === "number" && version >= VISIBILITY_VERSION_CURRENT)
}

export function migrateHiddenToVisible(
  storedHiddenById: Readonly<Record<string, unknown>>,
  knownIds: readonly string[]
): Record<string, boolean> {
  const visibleById: Record<string, boolean> = {}
  for (const id of knownIds) {
    const storedHidden = coerceStoredBoolean(storedHiddenById[id])
    if (storedHidden !== undefined) visibleById[id] = !storedHidden
  }
  return visibleById
}
