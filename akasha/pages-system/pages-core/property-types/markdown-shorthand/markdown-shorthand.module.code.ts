import type {
  HeadingLevel,
  V1BlockType,
} from "../rich-document-ops/rich-document-ops.module.code.ts"

export type ShorthandTrigger = "space" | "enter"

export type ShorthandTransform =
  | {
      kind: "turn"
      type: Exclude<V1BlockType, "divider">
      level?: HeadingLevel
      checked?: boolean
      marker: string
    }
  | { kind: "divider" }

export function detectMarkdownShorthand(
  text: string,
  caret: number,
  trigger: ShorthandTrigger
): ShorthandTransform | null {
  if (caret !== text.length) return null

  if (trigger === "enter") {
    return text === "---" ? { kind: "divider" } : null
  }

  switch (text) {
    case "#":
      return { kind: "turn", type: "heading", level: 1, marker: "# " }
    case "##":
      return { kind: "turn", type: "heading", level: 2, marker: "## " }
    case "###":
      return { kind: "turn", type: "heading", level: 3, marker: "### " }
    case "-":
    case "*":
    case "+":
      return { kind: "turn", type: "bulleted-list-item", marker: "- " }
    case ">":
      return { kind: "turn", type: "toggle", marker: "> " }
    case '"':
      return { kind: "turn", type: "quote", marker: '" ' }
    case "[]":
    case "[ ]":
      return { kind: "turn", type: "to-do", checked: false, marker: "[ ] " }
    case "[x]":
    case "[X]":
      return { kind: "turn", type: "to-do", checked: true, marker: "[x] " }
    case "```":
      return { kind: "turn", type: "code", marker: "``` " }
    default:
      return /^\d+\.$/.test(text)
        ? { kind: "turn", type: "numbered-list-item", marker: `${text} ` }
        : null
  }
}
