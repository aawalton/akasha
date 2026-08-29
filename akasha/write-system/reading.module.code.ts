import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"

export type Oid = string

export type Reading = {
  readonly oid: Oid
  readonly seenAt: number
}

export const BODY_CEILING = 32_768

export type Record_ = {
  readonly of: (path: string) => Reading | null
  readonly keep: (path: string, oid: Oid, seenAt: number) => void
  readonly flush: () => void
}

export type BodyStore = {
  readonly of: (oid: Oid) => string | null
  readonly keep: (oid: Oid, body: string) => void
}

export function oidOf(body: string): Oid {
  const bytes = Buffer.from(body, "utf8")
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex")
}

type Held = Record<
  string,
  { oid: string; seenAt: number; expiredAt?: number; mechanicalOid?: string }
>

export function recordAt(path: string): Record_ {
  let held: Held = {}
  if (existsSync(path)) {
    try {
      held = JSON.parse(readFileSync(path, "utf8")) as Held
    } catch {
      held = {}
    }
  }
  const pending = new Map<string, Held[string]>()
  return {
    of: (at) => {
      const one = pending.get(at) ?? held[at]
      if (one === undefined) return null
      if (one.expiredAt !== undefined) return null
      return { oid: one.oid, seenAt: one.seenAt }
    },
    keep: (at, oid, seenAt) => {
      pending.set(at, { oid, seenAt })
    },
    flush: () => {
      if (pending.size === 0) return
      const all: Held = { ...held }
      for (const [at, one] of pending) all[at] = one
      const cut = path.lastIndexOf("/")
      if (cut > 0) mkdirSync(path.slice(0, cut), { recursive: true })
      writeFileSync(path, `${JSON.stringify(all, null, 2)}\n`)
      held = all
      pending.clear()
    },
  }
}

export function bodiesAt(dir: string): BodyStore {
  return {
    of: (oid) => {
      try {
        return readFileSync(`${dir}/${oid}`, "utf8")
      } catch {
        return null
      }
    },
    keep: (oid, body) => {
      if (body.length > BODY_CEILING) return
      const at = `${dir}/${oid}`
      if (existsSync(at)) return
      mkdirSync(dir, { recursive: true })
      writeFileSync(at, body)
    },
  }
}
