export interface PendingInvalidation {
  readonly version: number
  readonly invalidateVersion: number
  readonly invalidateDomains: readonly string[]
}

export interface ApplyInvalidationsView {
  readonly lastSeenInvalidateVersion: number
  readonly completed: boolean
  readonly presentDomainKeys: readonly string[]
}

export type ApplyInvalidationsResult =
  | { readonly kind: "noop"; readonly next: ApplyInvalidationsView }
  | { readonly kind: "applied"; readonly next: ApplyInvalidationsView }

export function applyPendingInvalidations(
  sv: ApplyInvalidationsView,
  sideFile: PendingInvalidation | undefined,
  allKeys: readonly string[]
): ApplyInvalidationsResult {
  if (sideFile === undefined) return { kind: "noop", next: sv }
  if (sideFile.invalidateVersion <= sv.lastSeenInvalidateVersion) {
    return { kind: "noop", next: sv }
  }

  const allKeySet = new Set(allKeys)
  const removalSet =
    sideFile.invalidateDomains.length === 0
      ? allKeySet
      : new Set(sideFile.invalidateDomains.filter((k) => allKeySet.has(k)))

  const nextPresent = sv.presentDomainKeys.filter((k) => !removalSet.has(k))

  return {
    kind: "applied",
    next: {
      lastSeenInvalidateVersion: sideFile.invalidateVersion,
      completed: false,
      presentDomainKeys: nextPresent,
    },
  }
}
