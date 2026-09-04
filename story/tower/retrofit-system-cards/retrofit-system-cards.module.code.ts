import { assertNever } from "@akasha/utils-narrow/assert-never"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import { countWords } from "../render-chapter/render-chapter.module.code.ts"

const ONE_CAPTURE = z.tuple([z.string()])
const TWO_CAPTURE = z.tuple([z.string(), z.string()])

const SKILL_ALIASES: Readonly<Record<string, string>> = {
  "Ember Lash": "Ember Wave",
}

const RUNG_ORDER: readonly string[] = [
  "novice",
  "apprentice",
  "journeyman",
  "expert",
  "master",
  "grandmaster",
  "sage",
]
const TIER_ORDER: readonly string[] = ["affinity", "manipulation", "spirit", "soul"]

const FENCE = "```"
const SYSTEM_CARD = new RegExp(
  `\\n\\n(\\*\\*[^\\n]+\\*\\*)\\n\\n${FENCE}\\n([\\s\\S]*?)\\n${FENCE}`,
  "g"
)

function canonSkill(name: string): string {
  const trimmed = name.trim()
  return SKILL_ALIASES[trimmed] ?? trimmed
}

function affinityElement(name: string): string {
  return name.replace(/\s*[·(].*$/, "").trim()
}

function stripQualifier(name: string): string {
  return name.replace(/\s*[·(].*$/, "").trim()
}

function rungIndex(rung: string): number {
  return RUNG_ORDER.indexOf(rung.trim().toLowerCase())
}
function tierIndex(tier: string): number {
  return TIER_ORDER.indexOf(tier.trim().toLowerCase())
}

export type ParsedDing =
  | { kind: "level"; level: string }
  | { kind: "skillEmerge"; name: string }
  | { kind: "skillEvolve"; name: string; rung: string }
  | { kind: "affinityEmerge"; name: string }
  | { kind: "affinityPromote"; name: string; tier: string }
  | { kind: "class"; name: string }
  | { kind: "title"; name: string }

const LEVEL_RE = /^LEVEL(?:\s+UP)?\s*(?:—\s*)?(\d+)\b/
const SKILL_TICK_RE = /^SKILL\s+\+\d/
const SKILL_TEMPLATE_EVOLVE_RE = /^SKILL — (.+?)\s*→\s*(.+)$/
const SKILL_TEMPLATE_EMERGE_RE = /^SKILL — (.+)$/
const AFFINITY_TEMPLATE_PROMOTE_RE = /^AFFINITY — (.+?)\s*→\s*(.+)$/
const AFFINITY_TEMPLATE_EMERGE_RE = /^AFFINITY — (.+)$/
const SKILL_ADVANCED_RE = /^SKILL ADVANCED — (.+?)\s*\((.+?)\)\s*$/
const SKILL_EMERGED_RE = /^SKILL EMERGED — (.+)$/
const AFFINITY_ADVANCED_RE = /^AFFINITY ADVANCED — (.+?)\s*·\s*(.+)$/
const AFFINITY_ACQUIRED_RE = /^AFFINITY ACQUIRED — (.+)$/
const CLASS_RE = /^CLASS — (.+)$/
const TITLE_RE = /^TITLE — (.+)$/

export function parseDing(line: string): ParsedDing | null {
  const text = line.trim()

  if (LEVEL_RE.test(text)) {
    const [level] = requireMatchPositional(LEVEL_RE, ONE_CAPTURE, text)
    return { kind: "level", level }
  }

  if (SKILL_TICK_RE.test(text)) return null

  if (SKILL_TEMPLATE_EVOLVE_RE.test(text)) {
    const [name, rung] = requireMatchPositional(SKILL_TEMPLATE_EVOLVE_RE, TWO_CAPTURE, text)
    return { kind: "skillEvolve", name: canonSkill(name), rung: rung.trim() }
  }
  if (SKILL_TEMPLATE_EMERGE_RE.test(text)) {
    const [name] = requireMatchPositional(SKILL_TEMPLATE_EMERGE_RE, ONE_CAPTURE, text)
    return { kind: "skillEmerge", name: canonSkill(name) }
  }
  if (AFFINITY_TEMPLATE_PROMOTE_RE.test(text)) {
    const [name, tier] = requireMatchPositional(AFFINITY_TEMPLATE_PROMOTE_RE, TWO_CAPTURE, text)
    return { kind: "affinityPromote", name: affinityElement(name), tier: tier.trim() }
  }
  if (AFFINITY_TEMPLATE_EMERGE_RE.test(text)) {
    const [name] = requireMatchPositional(AFFINITY_TEMPLATE_EMERGE_RE, ONE_CAPTURE, text)
    return { kind: "affinityEmerge", name: affinityElement(name) }
  }

  if (SKILL_ADVANCED_RE.test(text)) {
    const [name, rung] = requireMatchPositional(SKILL_ADVANCED_RE, TWO_CAPTURE, text)
    return { kind: "skillEvolve", name: canonSkill(name), rung: rung.trim() }
  }
  if (SKILL_EMERGED_RE.test(text)) {
    const [name] = requireMatchPositional(SKILL_EMERGED_RE, ONE_CAPTURE, text)
    return { kind: "skillEmerge", name: canonSkill(stripQualifier(name)) }
  }

  if (AFFINITY_ADVANCED_RE.test(text)) {
    const [name, tier] = requireMatchPositional(AFFINITY_ADVANCED_RE, TWO_CAPTURE, text)
    return { kind: "affinityPromote", name: affinityElement(name), tier: tier.trim() }
  }
  if (AFFINITY_ACQUIRED_RE.test(text)) {
    const [name] = requireMatchPositional(AFFINITY_ACQUIRED_RE, ONE_CAPTURE, text)
    return { kind: "affinityEmerge", name: affinityElement(name) }
  }

  if (CLASS_RE.test(text)) {
    const [name] = requireMatchPositional(CLASS_RE, ONE_CAPTURE, text)
    const trimmed = name.trim()
    return /^none$/i.test(trimmed) ? null : { kind: "class", name: trimmed }
  }

  if (TITLE_RE.test(text)) {
    const [name] = requireMatchPositional(TITLE_RE, ONE_CAPTURE, text)
    return { kind: "title", name: name.trim() }
  }

  return null
}

export function renderDing(ding: ParsedDing): string {
  switch (ding.kind) {
    case "level":
      return `LEVEL UP — ${ding.level}`
    case "skillEmerge":
      return `SKILL — ${ding.name}`
    case "skillEvolve":
      return `SKILL — ${ding.name} → ${ding.rung}`
    case "affinityEmerge":
      return `AFFINITY — ${ding.name}`
    case "affinityPromote":
      return `AFFINITY — ${ding.name} → ${ding.tier}`
    case "class":
      return `CLASS — ${ding.name}`
    case "title":
      return `TITLE — ${ding.name}`
    default:
      return assertNever(ding)
  }
}

export type ProgressionState = {
  skill: Map<string, number>
  affinity: Map<string, number>
}
export function createProgressionState(): ProgressionState {
  return { skill: new Map(), affinity: new Map() }
}

function admit(ding: ParsedDing, state: ProgressionState): ParsedDing | null {
  switch (ding.kind) {
    case "level":
    case "class":
    case "title":
      return ding
    case "skillEmerge": {
      if (state.skill.has(ding.name)) return null
      state.skill.set(ding.name, 0)
      return ding
    }
    case "skillEvolve": {
      const idx = rungIndex(ding.rung)
      const prev = state.skill.get(ding.name) ?? -1
      if (idx <= prev) return null
      state.skill.set(ding.name, idx)
      return ding
    }
    case "affinityEmerge": {
      if (state.affinity.has(ding.name)) return null
      state.affinity.set(ding.name, 0)
      return ding
    }
    case "affinityPromote": {
      const idx = tierIndex(ding.tier)
      const prev = state.affinity.get(ding.name) ?? -1
      if (idx <= prev) return null
      state.affinity.set(ding.name, idx)
      return ding
    }
    default:
      return assertNever(ding)
  }
}

function dingRank(ding: ParsedDing): number {
  switch (ding.kind) {
    case "level":
      return 0
    case "skillEmerge":
    case "skillEvolve":
      return 1
    case "affinityEmerge":
    case "affinityPromote":
      return 2
    case "class":
      return 3
    case "title":
      return 4
    default:
      return assertNever(ding)
  }
}

export type CardReduction = { kind: "preserve" } | { kind: "dings"; dings: readonly string[] }

function isSoulAppraisal(heading: string): boolean {
  return /soul appraisal/i.test(heading)
}

export function reduceCard(
  heading: string,
  bodyLines: readonly string[],
  state: ProgressionState
): CardReduction {
  if (isSoulAppraisal(heading)) return { kind: "preserve" }
  const admitted: ParsedDing[] = []
  for (const line of bodyLines) {
    const parsed = parseDing(line)
    if (parsed === null) continue
    const kept = admit(parsed, state)
    if (kept !== null) admitted.push(kept)
  }
  const dings = admitted
    .map((ding, index) => ({ ding, index }))
    .sort((a, b) => {
      const rankDiff = dingRank(a.ding) - dingRank(b.ding)
      return rankDiff !== 0 ? rankDiff : a.index - b.index
    })
    .map(({ ding }) => renderDing(ding))
  return { kind: "dings", dings }
}

export function extractSystemCards(
  text: string
): readonly { heading: string; lines: readonly string[] }[] {
  const out: { heading: string; lines: readonly string[] }[] = []
  for (const m of text.matchAll(SYSTEM_CARD)) {
    const headingMarked = m[1]
    const body = m[2]
    if (headingMarked === undefined || body === undefined) continue
    const heading = headingMarked.replace(/^\*\*/, "").replace(/\*\*$/, "")
    out.push({ heading, lines: body.split("\n") })
  }
  return out
}

export type RetrofittedChapter = { text: string; wordCount: number }

export function retrofitChapterText(
  text: string,
  state: ProgressionState = createProgressionState()
): RetrofittedChapter {
  const next = text.replace(SYSTEM_CARD, (_match, headingMarked: string, body: string) => {
    const heading = headingMarked.replace(/^\*\*/, "").replace(/\*\*$/, "")
    const reduction = reduceCard(heading, body.split("\n"), state)
    if (reduction.kind === "preserve") {
      return `\n\n${headingMarked}\n\n${FENCE}\n${body}\n${FENCE}`
    }
    if (reduction.dings.length === 0) return ""
    return `\n\n**The Tower**\n\n${FENCE}\n${reduction.dings.join("\n")}\n${FENCE}`
  })
  return { text: next, wordCount: countWords(next) }
}
