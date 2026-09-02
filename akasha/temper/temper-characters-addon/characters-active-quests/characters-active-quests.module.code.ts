import { isDailyCraftingWritQuest } from "../characters-daily-writs-detection/characters-daily-writs-detection.module.code.ts"
import { formatProgressCount } from "../characters-progress-format/characters-progress-format.module.code.ts"

export interface ActiveQuest {
  readonly name: string
  readonly hint: string | undefined
  readonly isAssisted: boolean
}

function isSpace(c: string): boolean {
  return c === " " || c === "\t"
}

function isDigit(c: string): boolean {
  return c >= "0" && c <= "9"
}

function isLetter(c: string): boolean {
  return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z")
}

function isCountChar(c: string): boolean {
  return isDigit(c) || c === ","
}

function isPipeCodeChar(c: string): boolean {
  return isLetter(c) || isDigit(c) || c === ":" || c === "." || c === "_" || c === "/" || c === "-"
}

function digitsOnly(s: string): string {
  let out = ""
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charAt(i)
    if (c !== ",") out = `${out}${c}`
  }
  return out
}

function trailingContentEnd(t: string): number {
  let i = t.length
  let changed = true
  while (changed) {
    changed = false
    while (i > 0 && isSpace(t.charAt(i - 1))) {
      i -= 1
      changed = true
    }
    let j = i
    while (j > 0 && isLetter(t.charAt(j - 1))) j -= 1
    if (j < i && j > 0 && t.charAt(j - 1) === "^") {
      i = j - 1
      changed = true
      continue
    }
    let k = i
    while (k > 0 && isPipeCodeChar(t.charAt(k - 1))) k -= 1
    if (k < i && k > 0 && t.charAt(k - 1) === "|") {
      i = k - 1
      changed = true
    }
  }
  return i
}

function stripLabelTail(s: string): string {
  let r = s.trim()
  while (r.length > 0 && r.charAt(r.length - 1) === ":") {
    r = r.slice(0, r.length - 1).trim()
  }
  return r
}

export function stripTrailingCount(this: void, text: string, current: number, max: number): string {
  const t = text.trim()
  let p = trailingContentEnd(t)
  const maxEnd = p
  while (p > 0 && isCountChar(t.charAt(p - 1))) p -= 1
  if (p === maxEnd || digitsOnly(t.slice(p, maxEnd)) !== `${max}`) return t
  while (p > 0 && isSpace(t.charAt(p - 1))) p -= 1
  if (p === 0 || t.charAt(p - 1) !== "/") return t
  p -= 1
  while (p > 0 && isSpace(t.charAt(p - 1))) p -= 1
  const curEnd = p
  while (p > 0 && isCountChar(t.charAt(p - 1))) p -= 1
  if (p === curEnd || digitsOnly(t.slice(p, curEnd)) !== `${current}`) return t
  return stripLabelTail(t.slice(0, p))
}

export function formatConditionLine(
  this: void,
  text: string,
  current: number,
  max: number
): string {
  const label = stripTrailingCount(text, current, max)
  if (label === "") return ""
  if (max > 1) return formatProgressCount(label, current, max)
  return label
}

export function pickQuestHint(
  this: void,
  trackerOverrideText: string,
  firstObjective: string | undefined
): string | undefined {
  const override = trackerOverrideText.trim()
  if (override !== "") return override
  return firstObjective
}

export function normalizeStepText(this: void, text: string): string | undefined {
  const t = text.trim()
  if (t === "") return undefined
  return t
}

export function pickActiveQuestHint(
  this: void,
  isComplete: boolean,
  trackerOverrideText: string,
  activeStepText: string,
  firstObjective: string | undefined
): string | undefined {
  const fallback = isComplete ? normalizeStepText(activeStepText) : firstObjective
  return pickQuestHint(trackerOverrideText, fallback)
}

export function readFirstObjective(this: void, questIndex: number): string | undefined {
  const numSteps = GetJournalQuestNumSteps(questIndex)
  for (let s = 1; s <= numSteps; s += 1) {
    const numConditions = GetJournalQuestNumConditions(questIndex, s)
    for (let c = 1; c <= numConditions; c += 1) {
      const [conditionText, current, max, isFailCondition, isComplete] =
        GetJournalQuestConditionInfo(questIndex, s, c)
      if (isFailCondition || isComplete) continue
      const line = formatConditionLine(conditionText, current, max)
      if (line !== "") return line
    }
  }
  return undefined
}

export function sortActiveQuests(
  this: void,
  quests: readonly ActiveQuest[]
): readonly ActiveQuest[] {
  const copy = [...quests]
  copy.sort((a, b) => {
    const an = a.name.toLowerCase()
    const bn = b.name.toLowerCase()
    if (an < bn) return -1
    if (an > bn) return 1
    return 0
  })
  return copy
}

export function getActiveQuests(this: void): readonly ActiveQuest[] {
  const quests: ActiveQuest[] = []
  const numQuests = GetNumJournalQuests()
  for (let i = 1; i <= numQuests; i += 1) {
    if (isDailyCraftingWritQuest(i)) continue
    const isComplete = GetJournalQuestIsComplete(i)
    const [questName, , activeStepText, , activeStepTrackerOverrideText] = GetJournalQuestInfo(i)
    const name = zo_strformat("<<1>>", questName).trim()
    if (name === "") continue
    const firstObjective = isComplete ? undefined : readFirstObjective(i)
    quests.push({
      name,
      hint: pickActiveQuestHint(
        isComplete,
        activeStepTrackerOverrideText,
        activeStepText,
        firstObjective
      ),
      isAssisted: GetTrackedIsAssisted(TRACK_TYPE_QUEST, i, 0),
    })
  }
  return sortActiveQuests(quests)
}
