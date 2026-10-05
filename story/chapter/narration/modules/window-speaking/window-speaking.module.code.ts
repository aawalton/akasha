import {
  describedIn,
  type WrittenWindow,
} from "akasha/story/engine/core/modules/prose-windows/prose-windows.module.code.ts"

const ENDS_SPOKEN = /[.!?…]["'”’)\]]*$/
const SHOUTED = /\b[A-Z][A-Z'’]{2,}\b/g
const ROMAN = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
const BRACKETS = /[[\]{}<>]/g
const DASH = /\s+[—–-]\s+/g
const SLASH = /\s+\/\s+/g
const ARROW = /\s*(?:→|->|=>)\s*/g
const SPACES = /\s+/g
const KIND_PARTS = /[-_]+/

function wordOf(shouted: string): string {
  if (ROMAN.test(shouted)) return shouted
  return shouted.charAt(0) + shouted.slice(1).toLowerCase()
}

export function spokenLine(line: string): string {
  const said = line
    .replace(BRACKETS, " ")
    .replace(SLASH, " of ")
    .replace(ARROW, " to ")
    .replace(DASH, ", ")
    .replace(SHOUTED, wordOf)
    .replace(SPACES, " ")
    .trim()
  if (said === "") return ""
  return ENDS_SPOKEN.test(said) ? said : `${said}.`
}

function sentences(...lines: (string | undefined)[]): string[] {
  return lines.flatMap((line) => {
    if (line === undefined) return []
    const said = spokenLine(line)
    return said === "" ? [] : [said]
  })
}

function noteSentences(note: string | undefined): string[] {
  if (note === undefined) return []
  return describedIn(note).flatMap(({ label, value }) =>
    sentences(label === "" ? value : `${label}, ${value}`)
  )
}

function levelSentence(level: number | undefined): string | undefined {
  return level === undefined ? undefined : `Level ${level}`
}

function rankSentence(rung: string | undefined): string | undefined {
  return rung === undefined ? undefined : `Rank, ${rung}`
}

function kindSaid(kind: string): string {
  const said = kind
    .split(KIND_PARTS)
    .filter((word) => word !== "")
    .join(" ")
  return said.charAt(0).toUpperCase() + said.slice(1)
}

function named(heading: string, name: string | undefined): string {
  return name === undefined ? heading : `${heading}: ${name}`
}

export function spokenWindow(window: WrittenWindow): string[] {
  const { kind, name, rung, level, note } = window
  switch (kind) {
    case "level-up":
      return sentences(
        "Level up",
        level === undefined ? undefined : `You are now level ${level}`,
        ...noteSentences(note)
      )
    case "skill":
      return sentences(named("New skill", name), rankSentence(rung), ...noteSentences(note))
    case "status-assessment":
      return sentences(named("Status", name), levelSentence(level), ...noteSentences(note))
    case "item-award":
      return sentences(named("Item received", name), ...noteSentences(note))
    case "quest-offer":
    case "quest-added":
      return sentences(named("New quest", name), note)
    case "quest-complete":
      return sentences(named("Quest complete", name), note)
    case "affinity":
      return sentences(named("Affinity gained", name), ...noteSentences(note))
    case "class":
      return sentences(named("Class", name), levelSentence(level), ...noteSentences(note))
    case "title":
      return sentences(named("Title earned", name), ...noteSentences(note))
    default:
      return sentences(
        named(kindSaid(kind), name),
        rankSentence(rung),
        levelSentence(level),
        ...noteSentences(note)
      )
  }
}

export function spokenScreen(lines: readonly string[]): string[] {
  return sentences(...lines)
}
