import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { Block } from "../rich-document/rich-document.module.code.ts"

export type MarkerBlockType = "bulleted-list-item" | "numbered-list-item" | "to-do" | "toggle"

export function isMarkerType(type: string): type is MarkerBlockType {
  return (
    type === "bulleted-list-item" ||
    type === "numbered-list-item" ||
    type === "to-do" ||
    type === "toggle"
  )
}

const BULLET_MARKER = "- "
const TODO_UNCHECKED = "[ ] "
const TODO_CHECKED = "[x] "
const TOGGLE_MARKER = "> "

const DIGITS_RE = /^\d+$/

export interface LeadingMarker {
  readonly kind: MarkerBlockType
  readonly marker: string
  readonly number?: number
  readonly checked?: boolean
}

export function leadingMarker(text: string): LeadingMarker | null {
  if (text.startsWith(BULLET_MARKER)) return { kind: "bulleted-list-item", marker: BULLET_MARKER }
  if (text.startsWith(TODO_UNCHECKED)) {
    return { kind: "to-do", marker: TODO_UNCHECKED, checked: false }
  }
  if (text.startsWith(TODO_CHECKED) || text.startsWith("[X] ")) {
    return { kind: "to-do", marker: text.slice(0, TODO_CHECKED.length), checked: true }
  }
  if (text.startsWith(TOGGLE_MARKER)) return { kind: "toggle", marker: TOGGLE_MARKER }
  const dot = text.indexOf(". ")
  if (dot > 0) {
    const digits = text.slice(0, dot)
    if (DIGITS_RE.test(digits)) {
      return { kind: "numbered-list-item", marker: `${digits}. `, number: Number(digits) }
    }
  }
  return null
}

export function markerFor(
  type: MarkerBlockType,
  opts?: { ordinal?: number; checked?: boolean }
): string {
  switch (type) {
    case "bulleted-list-item":
      return BULLET_MARKER
    case "numbered-list-item":
      return `${opts?.ordinal ?? 1}. `
    case "to-do":
      return opts?.checked === true ? TODO_CHECKED : TODO_UNCHECKED
    case "toggle":
      return TOGGLE_MARKER
    default:
      return assertNever(type)
  }
}

export function stripLeadingMarker(text: string): string {
  const found = leadingMarker(text)
  return found === null ? text : text.slice(found.marker.length)
}

export function isTodoChecked(text: string): boolean {
  const found = leadingMarker(text)
  return found?.kind === "to-do" && found.checked === true
}

export function toggleTodoMarker(text: string): string {
  const found = leadingMarker(text)
  if (found?.kind !== "to-do") return text
  const rest = text.slice(found.marker.length)
  return (found.checked === true ? TODO_UNCHECKED : TODO_CHECKED) + rest
}

export function nextNumberedMarker(text: string): string {
  const found = leadingMarker(text)
  const current =
    found?.kind === "numbered-list-item" && found.number !== undefined ? found.number : 0
  return `${current + 1}. `
}

export function healBlockMarker(block: Block, ordinal: number): Block {
  if (!isMarkerType(block.type)) return block
  const text = typeof block.text === "string" ? block.text : ""
  const hasMarker = leadingMarker(text) !== null
  const nextText = hasMarker
    ? text
    : markerFor(block.type, {
        ordinal,
        checked: block.type === "to-do" ? block.checked === true : undefined,
      }) + text
  if ("checked" in block) {
    const { checked, ...rest } = block
    return { ...rest, text: nextText }
  }
  return nextText === text ? block : { ...block, text: nextText }
}
