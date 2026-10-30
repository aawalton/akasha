import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { z } from "zod"

type Elapse =
  | { readonly kind: "at"; readonly ms: number }
  | { readonly kind: "never" }
  | { readonly kind: "unread"; readonly said: string }

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
