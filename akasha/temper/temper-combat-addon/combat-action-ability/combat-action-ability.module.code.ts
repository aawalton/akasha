import { isDigitChar } from "@akasha/temper-combat-addon/combat-action-icon-path"
import type { Ability } from "@akasha/temper-combat-addon/combat-action-types"

const DIGITS = "0123456789"
const WHITESPACE = " \t\n\r"

function isNumberRunChar(c: string): boolean {
  return isDigitChar(c) || c === "." || c === ","
}

function isSpace(c: string): boolean {
  return c.length === 1 && WHITESPACE.includes(c)
}

function digitValue(c: string): number {
  return DIGITS.indexOf(c)
}

function parseDecimal(token: string): number | undefined {
  let intPart = ""
  let fracPart = ""
  let separatorSeen = false
  for (let i = 0; i < token.length; i = i + 1) {
    const c = token.charAt(i)
    if (isDigitChar(c)) {
      if (separatorSeen) {
        fracPart = fracPart + c
      } else {
        intPart = intPart + c
      }
    } else if (c === "." || c === ",") {
      if (separatorSeen) {
        return undefined
      }
      separatorSeen = true
    } else {
      return undefined
    }
  }
  if (intPart.length === 0 && fracPart.length === 0) {
    return undefined
  }
  let value = 0
  for (let i = 0; i < intPart.length; i = i + 1) {
    value = value * 10 + digitValue(intPart.charAt(i))
  }
  let scale = 1
  for (let i = 0; i < fracPart.length; i = i + 1) {
    scale = scale / 10
    value = value + digitValue(fracPart.charAt(i)) * scale
  }
  return value
}

function trimWhitespace(s: string): string {
  let start = 0
  let end = s.length
  while (start < end && isSpace(s.charAt(start))) {
    start = start + 1
  }
  while (end > start && isSpace(s.charAt(end - 1))) {
    end = end - 1
  }
  return s.slice(start, end)
}

function stripBracket(origin: string): string {
  const lt = origin.indexOf("<")
  if (lt <= 0) {
    return origin
  }
  const gt = origin.indexOf(">", lt + 1)
  if (gt === -1) {
    return origin
  }
  const inner = trimWhitespace(origin.slice(lt + 1, gt))
  return inner.length > 0 ? inner : origin
}

export function buildAbility(p: {
  id: number
  name: string
  showName?: string
  icon: string
  icon2?: string
  icon3?: string
  progressionName?: string
  description: string
  type: number
}): Ability {
  const getIconPath = (icon: string): string => (icon.slice(0, 1) === "/" ? icon : `/${icon}`)

  const ability: Ability = {
    id: p.id,
    name: p.name,
    showName: p.showName !== undefined ? p.showName : stripBracket(p.name),
    icon: getIconPath(p.icon),
    description: p.description,
    type: p.type,
  }
  if (p.icon2 !== undefined) {
    ability.icon2 = getIconPath(p.icon2)
  }
  if (p.icon3 !== undefined) {
    ability.icon3 = getIconPath(p.icon3)
  }
  if (p.progressionName !== undefined) {
    ability.progressionName = p.progressionName
  }
  return ability
}

export function parseDescriptionDuration(description: string): number | undefined {
  const lower = description.toLowerCase()
  const len = lower.length
  let num = 0
  let i = 0
  while (i < len) {
    if (!isNumberRunChar(lower.charAt(i))) {
      i = i + 1
      continue
    }
    const start = i
    while (i < len && isNumberRunChar(lower.charAt(i))) {
      i = i + 1
    }
    if (!isDigitChar(lower.charAt(i - 1))) {
      continue
    }
    let j = i
    while (j < len && isSpace(lower.charAt(j))) {
      j = j + 1
    }
    if (lower.slice(j, j + 6) !== "second") {
      continue
    }
    const parsed = parseDecimal(lower.slice(start, i))
    if (parsed === undefined) {
      continue
    }
    const n = parsed * 1000
    if (num === 0 || (n < 30000 && n > num)) {
      num = n
    }
  }
  return num > 0 ? num : undefined
}

export function parseDescriptionNums(description: string): number[] {
  const len = description.length
  const seen = new Set<number>()
  const out: number[] = []
  let i = 0
  while (i < len) {
    if (!isNumberRunChar(description.charAt(i))) {
      i = i + 1
      continue
    }
    const start = i
    while (i < len && isNumberRunChar(description.charAt(i))) {
      i = i + 1
    }
    let end = i
    while (end > start && !isDigitChar(description.charAt(end - 1))) {
      end = end - 1
    }
    if (end === start) {
      continue
    }
    const n = parseDecimal(description.slice(start, end))
    if (n !== undefined && (n * 1000) % 1000 === 0 && !seen.has(n)) {
      seen.add(n)
      out.push(n)
    }
  }
  return out
}
