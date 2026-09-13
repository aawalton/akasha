import { textIn } from "akasha/utils/narrow/modules/text-in/text-in.module.code.ts"

export type ExternalIdentityHeld = {
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
