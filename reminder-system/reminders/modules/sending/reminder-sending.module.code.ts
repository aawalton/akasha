import { landedMechanically } from "@akasha/command-system/asking"
import { valuesOfType } from "@akasha/indexes"
import {
  mergeUncommitted,
  removeUncommitted,
  uncommittedIn,
} from "@akasha/pages-system/page-uncommitted"
import { textAt } from "@akasha/pages-system/page-value"
import { ran } from "@akasha/utils-run/running"

const CALLED_AS = "reminder-sending"

const PAGE_TYPE = "reminder"

const NEXT_AT = "nextAt"

export type Standing = {
  readonly path: string
  readonly slug: string
  readonly to: string
  readonly from: string
  readonly schedule: string
  readonly text: string
}

export type Elapse =
  | { readonly kind: "at"; readonly ms: number }
  | { readonly kind: "never" }
  | { readonly kind: "unread"; readonly said: string }

export function everyReminder(root: string): readonly Standing[] {
  const found: Standing[] = []
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const slug = textAt(one.value, "slug")
    const to = textAt(one.value, "to")
    const from = textAt(one.value, "from")
    const schedule = textAt(one.value, "schedule")
    const text = textAt(one.value, "text")
    if (slug === null || to === null || schedule === null || text === null) continue
    found.push({ path: one.path, slug, to, from: from ?? to, schedule, text })
  }
  return found
}

export function nextElapse(schedule: string): Elapse {
  const held = ran(["systemd-analyze", "calendar", schedule, "--iterations=1"])
  if (held.code !== 0) {
    const why = held.err.trim()
    return { kind: "unread", said: why === "" ? held.out.trim() : why }
  }
  if (/Next elapse:\s*never/i.test(held.out)) return { kind: "never" }
  const named = held.out.match(/\(in UTC\):\s*\S+\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/)
  if (named === null) {
    return { kind: "unread", said: "systemd named no next elapse in a form this could read" }
  }
  const ms = Date.parse(`${named[1]}T${named[2]}Z`)
  return Number.isFinite(ms)
    ? { kind: "at", ms }
    : { kind: "unread", said: `systemd named ${named[1]} ${named[2]}, which is no instant` }
}

export function armedAt(root: string, path: string): number | null {
  const held = uncommittedIn(root, path)?.[NEXT_AT]
  if (typeof held !== "string") return null
  const ms = Date.parse(held)
  return Number.isFinite(ms) ? ms : null
}

export function armFor(root: string, path: string, ms: number): undefined {
  mergeUncommitted(root, path, { [NEXT_AT]: new Date(ms).toISOString() })
}

export async function tookReminder(
  root: string,
  path: string,
  why: string
): Promise<string | null> {
  const landed = await landedMechanically(root, CALLED_AS, [{ path, body: null }], why)
  if (landed.code !== 0) return landed.refusals.join("; ")
  removeUncommitted(root, path)
  return null
}
