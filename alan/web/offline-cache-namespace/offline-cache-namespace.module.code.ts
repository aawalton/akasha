let cacheUserKey: string | null = null

export function setOfflineCacheUserKey(userId: string | null): undefined {
  cacheUserKey = userId
}

export function getOfflineCacheUserKey(): string | null {
  return cacheUserKey
}

export function offlineCachePrefix(): string | null {
  return cacheUserKey === null ? null : `u-${cacheUserKey}--`
}

export function namespacedPath(baseName: string): string | null {
  const prefix = offlineCachePrefix()
  return prefix === null ? null : `${prefix}${baseName}`
}
