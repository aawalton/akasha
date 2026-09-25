import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

type ExternalIdentityHeld = {
  readonly source?: unknown
  readonly externalId?: unknown
  readonly externalLink?: unknown
  readonly lastSyncedAt?: unknown
}

export function identitiesIn(held: unknown): readonly ExternalIdentityHeld[] {
  if (!Array.isArray(held)) return []
  return held.filter((one): one is ExternalIdentityHeld => typeof one === "object" && one !== null)
}

export function identityFrom(held: unknown, source: string): ExternalIdentityHeld | null {
  return identitiesIn(held).find((one) => one.source === source) ?? null
}

export function idFrom(held: unknown, source: string): string | null {
  const one = identityFrom(held, source)
  return one === null ? null : textIn(one.externalId)
}

export function linkFrom(held: unknown, source: string): string | null {
  const one = identityFrom(held, source)
  return one === null ? null : textIn(one.externalLink)
}

export function syncedFrom(held: unknown, source: string): string | null {
  const one = identityFrom(held, source)
  return one === null ? null : textIn(one.lastSyncedAt)
}

export function identitiesWith<Stated extends { readonly source: string }>(
  held: unknown,
  fresh: Stated
): readonly Stated[] {
  const kept = Array.isArray(held)
    ? (held as readonly Stated[]).filter((one) => one.source !== fresh.source)
    : []
  return [...kept, fresh].sort((a, b) => (a.source < b.source ? -1 : a.source > b.source ? 1 : 0))
}
