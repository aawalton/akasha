import { isMedium, type Medium } from "@akasha/pages-core/media-formats"
import type { ActiveSessionInit } from "@akasha/pages-ui/media/playing-session"
import { z } from "zod"

const STORAGE_KEY = "playing-session:v1"

const PERSISTED_SESSION_SCHEMA = z
  .object({
    pageId: z.string().min(1),
    pageTypeSlug: z.string().default(""),
    pageHref: z.string().min(1),
    title: z.string(),
    medium: z.custom<Medium>((v) => typeof v === "string" && isMedium(v)),
    variant: z.string().min(1),
    speed: z.number().finite(),
    nextHref: z.string().nullable(),
    position: z.number().finite().nonnegative(),
  })
  .strict()

export type PersistedSession = z.infer<typeof PERSISTED_SESSION_SCHEMA>

function sessionStore(): Storage | null {
  if (typeof window === "undefined") return null
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function readPersistedSession(): PersistedSession | null {
  const store = sessionStore()
  if (store == null) return null
  const raw = store.getItem(STORAGE_KEY)
  if (raw == null) return null
  try {
    const parsed = PERSISTED_SESSION_SCHEMA.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function writePersistedSession(session: ActiveSessionInit, position: number): undefined {
  const store = sessionStore()
  if (store == null) return
  const payload: PersistedSession = {
    pageId: session.pageId,
    pageTypeSlug: session.pageTypeSlug,
    pageHref: session.pageHref,
    title: session.title,
    medium: session.medium,
    variant: session.variant,
    speed: session.speed,
    nextHref: session.nextHref,
    position: Number.isFinite(position) && position > 0 ? position : 0,
  }
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {}
}

export function clearPersistedSession(): undefined {
  const store = sessionStore()
  if (store == null) return
  try {
    store.removeItem(STORAGE_KEY)
  } catch {}
}

export function persistedToSessionInit(persisted: PersistedSession): ActiveSessionInit {
  return {
    pageId: persisted.pageId,
    pageTypeSlug: persisted.pageTypeSlug,
    pageHref: persisted.pageHref,
    title: persisted.title,
    medium: persisted.medium,
    variant: persisted.variant,
    speed: persisted.speed,
    nextHref: persisted.nextHref,
  }
}
