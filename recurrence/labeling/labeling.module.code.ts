import { RRule } from "rrule"

const UNSUPPORTED_DIRECTIVES = ["BYSECOND", "BYMINUTE", "BYSETPOS", "WKST", "TZID"] as const

export function labelRrule(rule: string, opts: { anchorFromCompletion: boolean }): string {
  for (const directive of UNSUPPORTED_DIRECTIVES) {
    const pattern = new RegExp(`(^|[;:])${directive}=`, "i")
    if (pattern.test(rule)) {
      throw new Error(`labelRrule: directive ${directive} is not allowed in stored rrule values`)
    }
  }

  const normalized = rule.toUpperCase().startsWith("RRULE:") ? rule : `RRULE:${rule}`
  let parsed: RRule
  try {
    parsed = RRule.fromString(normalized)
  } catch {
    throw new Error(`labelRrule: malformed rrule string`)
  }

  if (!parsed.isFullyConvertibleToText()) {
    throw new Error(`labelRrule: rule cannot be losslessly labeled`)
  }

  const raw = parsed.toText()
  const concise = applyConcisionPass(raw)
  return opts.anchorFromCompletion ? `${concise}, from completion` : concise
}

function applyConcisionPass(raw: string): string {
  let out = raw

  out = out.replace(/^every day\b/i, "Daily")
  out = out.replace(/^every week\b/i, "Weekly")
  out = out.replace(/^every month\b/i, "Monthly")
  out = out.replace(/^every year\b/i, "Yearly")
  out = out.replace(/^every hour\b/i, "Hourly")

  out = out.replace(/\bMonday\b/g, "Mon")
  out = out.replace(/\bTuesday\b/g, "Tue")
  out = out.replace(/\bWednesday\b/g, "Wed")
  out = out.replace(/\bThursday\b/g, "Thu")
  out = out.replace(/\bFriday\b/g, "Fri")
  out = out.replace(/\bSaturday\b/g, "Sat")
  out = out.replace(/\bSunday\b/g, "Sun")

  const head = out[0]
  if (head !== undefined) {
    out = head.toUpperCase() + out.slice(1)
  }
  return out
}
