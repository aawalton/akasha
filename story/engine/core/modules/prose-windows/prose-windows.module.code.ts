import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import {
  type SystemWindow,
  SystemWindowSchema,
} from "akasha/story/engine/core/modules/system-window-schema/system-window-schema.module.code.ts"
import { z } from "zod"

const OPENING = /^:::([a-z][a-z0-9-]*)$/
const CLOSING = ":::"
const FIELD = /^([a-z]+):\s*(.*)$/
const FIELD_SAID = z.tuple([z.string(), z.string(), z.string()])
const LINES = "; "
const MARK = ": "
const NOT_FOUND = -1
const QUEST_ADDED = "quest-added"
const NAMED_BY: ReadonlyMap<string, string> = new Map([
  ["affinity", "affinity"],
  ["class", "class"],
  ["title", "title"],
])

export type WrittenWindow = {
  kind: string
  name?: string
  rung?: string
  level?: number
  note?: string
}

export type ProseWindowSegment =
  | { readonly kind: "prose"; readonly text: string }
  | { readonly kind: "window"; readonly window: WrittenWindow }

function fieldInto(window: WrittenWindow, line: string): undefined {
  const field = FIELD_SAID.safeParse(FIELD.exec(line))
  if (!field.success) return
  const [, key, value] = field.data
  const said = value.trim()
  if (said === "") return
  if (key === "level") {
    const level = asNumber(said)
    if (level !== null) window.level = level
  } else if (key === "name" || key === "rung" || key === "note") {
    window[key] = said
  }
}

export function proseWindowSegmentsIn(text: string): readonly ProseWindowSegment[] {
  const segments: ProseWindowSegment[] = []
  let prose: string[] = []
  let open: WrittenWindow | null = null
  const flushProse = (): undefined => {
    const said = prose.join("\n").trim()
    if (said !== "") segments.push({ kind: "prose", text: said })
    prose = []
  }
  const shut = (): undefined => {
    if (open !== null) segments.push({ kind: "window", window: open })
    open = null
  }
  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    const opening = firstCapture(OPENING.exec(trimmed))
    if (opening !== null) {
      shut()
      flushProse()
      open = { kind: opening }
    } else if (trimmed === CLOSING) {
      shut()
    } else if (open === null) {
      prose.push(line)
    } else if (trimmed === "") {
      shut()
    } else {
      fieldInto(open, trimmed)
    }
  }
  shut()
  flushProse()
  return segments
}

export function describedIn(note: string): { label: string; value: string }[] {
  return note.split(LINES).map((one) => {
    const at = one.indexOf(MARK)
    if (at === NOT_FOUND) return { label: "", value: one }
    return { label: one.slice(0, at), value: one.slice(at + MARK.length) }
  })
}

function drawnOf({ kind, name = "", note, rung, level }: WrittenWindow): unknown {
  switch (kind) {
    case "level-up":
      return { type: kind, level }
    case "item-award":
      return {
        type: kind,
        award: note === undefined ? { item: name } : { item: name, descriptors: describedIn(note) },
      }
    case "skill":
      return rung === undefined
        ? { type: kind, skill: name }
        : { type: kind, skill: name, rank: rung }
    case "quest-offer":
    case QUEST_ADDED:
      return { type: QUEST_ADDED, quest: { title: name, objective: note ?? "" } }
    case "quest-complete":
      return { type: kind, quest: { title: name, objective: note ?? "" } }
    case "status-assessment":
      return { type: kind, assessment: level === undefined ? { name } : { name, level } }
    default: {
      const key = NAMED_BY.get(kind)
      return key === undefined ? { type: kind } : { type: kind, [key]: name }
    }
  }
}

export function windowOf(written: WrittenWindow): SystemWindow | undefined {
  const drawn = SystemWindowSchema.safeParse(drawnOf(written))
  return drawn.success ? drawn.data : undefined
}
