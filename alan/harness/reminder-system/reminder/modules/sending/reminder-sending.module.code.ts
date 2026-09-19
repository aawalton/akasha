import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  mergeUncommitted,
  removeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { slugAt, textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { z } from "zod"

const TOOK = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const PAGE_TYPE = "reminder"

const NEXT_AT = "nextAt"

export type Found = {
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

export function everyReminder(root: string): readonly Found[] {
  const found: Found[] = []
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const slug = textAt(one.value, "slug")
    const to = slugAt(one.value, "to")
    const from = slugAt(one.value, "from")
    const schedule = textAt(one.value, "schedule")
    const text = textAt(one.value, "text")
    if (slug === null || to === null || schedule === null || text === null) continue
    found.push({ path: one.path, slug, to, from: from ?? to, schedule, text })
  }
  return found
}

const NEXT_ELAPSE = /\(in UTC\):\s*\S+\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/

const NEXT_ELAPSE_CAPTURES = z.tuple([z.string(), z.string(), z.string()])

function parseNextElapse(
  matched: RegExpMatchArray | null
): { readonly date: string; readonly time: string } | null {
  if (matched === null) return null
  const held = NEXT_ELAPSE_CAPTURES.safeParse([...matched])
  if (!held.success) return null
  return { date: held.data[1], time: held.data[2] }
}

export function nextElapse(schedule: string): Elapse {
  const held = ran(["systemd-analyze", "calendar", schedule, "--iterations=1"])
  if (held.code !== 0) {
    const why = held.err.trim()
    return { kind: "unread", said: why === "" ? held.out.trim() : why }
  }
  if (/Next elapse:\s*never/i.test(held.out)) return { kind: "never" }
  const named = parseNextElapse(held.out.match(NEXT_ELAPSE))
  if (named === null) {
    return { kind: "unread", said: "systemd named no next elapse in a form this could read" }
  }
  const ms = Date.parse(`${named.date}T${named.time}Z`)
  return Number.isFinite(ms)
    ? { kind: "at", ms }
    : { kind: "unread", said: `systemd named ${named.date} ${named.time}, which is no instant` }
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

function tookSaid(path: string): string {
  return `${path}, taken away because the reminder it held had sent`
}

function forgotSaid(path: string): string {
  return `the values kept beside ${path}, taken away with it`
}

export async function tookReminder(
  root: string,
  path: string,
  why: string,
  done: string[] = []
): Promise<string | null> {
  const landed = await runMechanicalChange(root, [{ at: TOOK, given: { at: path } }], why)
  const wrong = refusalsIn(landed)
  if (wrong.length > 0) return wrong.join("; ")
  done.push(tookSaid(path))
  removeUncommitted(root, path)
  done.push(forgotSaid(path))
  return null
}
