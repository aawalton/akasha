export function isValidLockKey(key: string): boolean {
  return key !== "" && key !== "0"
}

export function shouldSeedTemperLock(nativeLocked: boolean, alreadyTemperLocked: boolean): boolean {
  return nativeLocked && !alreadyTemperLocked
}

export function selectStaleLockKeys(
  storedKeys: readonly string[],
  liveKeys: ReadonlySet<string>
): string[] {
  const stale: string[] = []
  for (const key of storedKeys) {
    if (!liveKeys.has(key)) stale.push(key)
  }
  return stale
}
