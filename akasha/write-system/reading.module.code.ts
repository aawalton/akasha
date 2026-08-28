import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"

export type Oid = string

export type Reading = {
  readonly oid: Oid
  readonly seenAt: number
}

export type Record_ = {
  readonly of: (path: string) => Reading | null
  readonly keep: (path: string, oid: Oid, seenAt: number) => void
  readonly flush: () => void
}

export function oidOf(body: string): Oid {
  const bytes = Buffer.from(body, "utf8")
  return createHash("sha1")
    .update(`blob ${bytes.length}\0`)
    .update(bytes)
    .digest("hex")
}

type Held = Record<string, { oid: string; seenAt: number }>

export function recordAt(path: string): Record_ {
  let held: Held = {}
  if (existsSync(path)) {
    try {
      held = JSON.parse(readFileSync(path, "utf8")) as Held
    } catch {
      held = {}
    }
  }
  const pending = new Map<string, { oid: string; seenAt: number }>()
  return {
    of: (at) => {
      const one = pending.get(at) ?? held[at]
      return one === undefined ? null : { oid: one.oid, seenAt: one.seenAt }
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
