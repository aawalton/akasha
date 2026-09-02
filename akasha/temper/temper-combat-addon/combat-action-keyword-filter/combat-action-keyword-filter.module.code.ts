import { STATE } from "@akasha/temper-combat-addon/combat-action-queue"

interface FilterAbility {
  id: number
  name: string
}

interface KeywordLine {
  left: string
  durationSeconds?: number
  isPureFilter: boolean
}

const WHITESPACE = " \t\n\v\f\r"

function trim(s: string): string {
  let start = 0
  let end = s.length
  while (start < end && WHITESPACE.includes(s.charAt(start))) {
    start = start + 1
  }
  while (end > start && WHITESPACE.includes(s.charAt(end - 1))) {
    end = end - 1
  }
  return s.slice(start, end)
}

function parseLines(keywords: string): KeywordLine[] {
  const lower = keywords.toLowerCase().replace(/\r/g, "\n")
  const out: KeywordLine[] = []
  for (const raw of lower.split("\n")) {
    const line = trim(raw)
    if (line.length === 0) {
      continue
    }
    const eq = line.indexOf("=")
    if (eq === -1) {
      out.push({ left: line, isPureFilter: true })
      continue
    }
    const left = trim(line.slice(0, eq))
    const durStr = trim(line.slice(eq + 1))
    const durNum = durStr.length > 0 ? Number(durStr) : Number.NaN
    const parsed: KeywordLine = {
      left,
      isPureFilter: false,
    }
    if (!Number.isNaN(durNum)) {
      parsed.durationSeconds = durNum
    }
    out.push(parsed)
  }
  return out
}

function lineMatches(line: KeywordLine, ability: FilterAbility): boolean {
  if (/^\d+$/.test(line.left)) {
    return Number(line.left) === ability.id
  }
  return ability.name.toLowerCase().includes(line.left)
}

interface WhiteScan {
  hasPureFilter: boolean
  matched: boolean
  durationMs?: number
}

function scanWhiteList(ability: FilterAbility, whiteList: string): WhiteScan {
  const scan: WhiteScan = { hasPureFilter: false, matched: false }
  for (const line of parseLines(whiteList)) {
    if (line.isPureFilter) {
      scan.hasPureFilter = true
    }
    scan.matched = lineMatches(line, ability)
    if (scan.matched) {
      if (line.durationSeconds !== undefined) {
        scan.durationMs = line.durationSeconds * 1000
      }
      break
    }
  }
  return scan
}

function checkAbilityOk(ability: FilterAbility, whiteList: string, blackList: string): boolean {
  const cached = STATE.idFilteringMap.get(ability.id)
  if (cached !== undefined) {
    return cached
  }

  const white = scanWhiteList(ability, whiteList)
  if (white.durationMs !== undefined) {
    STATE.idDurationMap.set(ability.id, white.durationMs)
  }

  if (white.hasPureFilter && !white.matched) {
    STATE.idFilteringMap.set(ability.id, false)
    return false
  }

  for (const line of parseLines(blackList)) {
    if (lineMatches(line, ability)) {
      STATE.idFilteringMap.set(ability.id, false)
      return false
    }
  }

  STATE.idFilteringMap.set(ability.id, true)
  return true
}

export function isFiltered(ability: FilterAbility, whiteList: string, blackList: string): boolean {
  return !checkAbilityOk(ability, whiteList, blackList)
}

export function getKeywordDuration(ability: FilterAbility, whiteList: string): number | undefined {
  const cached = STATE.idDurationMap.get(ability.id)
  if (cached !== undefined) {
    return cached
  }
  const white = scanWhiteList(ability, whiteList)
  if (white.durationMs !== undefined) {
    STATE.idDurationMap.set(ability.id, white.durationMs)
    return white.durationMs
  }
  return undefined
}
