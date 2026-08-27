import { describe, expect, it } from "bun:test"
import * as fc from "fast-check"
import { labelRrule } from "./labeling"

const DAY_CODES = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"] as const
const DAY_CODE_TO_NAME: Record<(typeof DAY_CODES)[number], string> = {
  MO: "Mon",
  TU: "Tue",
  WE: "Wed",
  TH: "Thu",
  FR: "Fri",
  SA: "Sat",
  SU: "Sun",
}

const FREQS = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"] as const

type GeneratedRule = {
  freq: (typeof FREQS)[number]
  interval?: number
  byday?: readonly (typeof DAY_CODES)[number][]
  bymonthday?: number
  until?: { year: number; month: number; day: number }
  count?: number
}

function buildRrule(g: GeneratedRule): string {
  const parts: string[] = [`FREQ=${g.freq}`]
  if (g.interval !== undefined) parts.push(`INTERVAL=${g.interval}`)
  if (g.byday !== undefined && g.byday.length > 0) parts.push(`BYDAY=${g.byday.join(",")}`)
  if (g.bymonthday !== undefined) parts.push(`BYMONTHDAY=${g.bymonthday}`)
  if (g.until !== undefined) {
    const m = String(g.until.month).padStart(2, "0")
    const d = String(g.until.day).padStart(2, "0")
    parts.push(`UNTIL=${g.until.year}${m}${d}T000000Z`)
  }
  if (g.count !== undefined) parts.push(`COUNT=${g.count}`)
  return parts.join(";")
}

const dayCodeArb = fc.constantFrom(...DAY_CODES)

const generatedRuleArb: fc.Arbitrary<GeneratedRule> = fc
  .record(
    {
      freq: fc.constantFrom(...FREQS),
      interval: fc.option(fc.integer({ min: 2, max: 5 }), { nil: undefined }),
      byday: fc.option(fc.uniqueArray(dayCodeArb, { minLength: 1, maxLength: 6 }), {
        nil: undefined,
      }),
      bymonthday: fc.option(fc.integer({ min: 1, max: 28 }), { nil: undefined }),
      hasUntil: fc.boolean(),
      untilYear: fc.integer({ min: 2026, max: 2030 }),
      untilMonth: fc.integer({ min: 1, max: 12 }),
      untilDay: fc.integer({ min: 1, max: 28 }),
      hasCount: fc.boolean(),
      count: fc.integer({ min: 1, max: 100 }),
    },
    {
      requiredKeys: [
        "freq",
        "hasUntil",
        "untilYear",
        "untilMonth",
        "untilDay",
        "hasCount",
        "count",
      ],
    }
  )
  .map((r) => {
    const useUntil = r.hasUntil && !r.hasCount
    const useCount = r.hasCount && !r.hasUntil
    const out: GeneratedRule = { freq: r.freq }
    if (r.interval !== undefined) out.interval = r.interval
    if (r.byday !== undefined && r.byday.length > 0 && r.freq === "WEEKLY") {
      const sorted = [...r.byday].sort().join(",")
      const isWeekdaySet = sorted === "FR,MO,TH,TU,WE"
      const isWeekendSet = sorted === "SA,SU"
      if (!isWeekdaySet && !isWeekendSet) {
        out.byday = r.byday
      }
    }
    if (r.bymonthday !== undefined) out.bymonthday = r.bymonthday
    if (useUntil) out.until = { year: r.untilYear, month: r.untilMonth, day: r.untilDay }
    if (useCount) out.count = r.count
    return out
  })

describe("labelRrule — property: Lossless contract", () => {
  it("every directive in the rule appears in the label", () => {
    fc.assert(
      fc.property(generatedRuleArb, (g) => {
        const rule = buildRrule(g)
        const label = labelRrule(rule, { anchorFromCompletion: false })

        if (g.interval !== undefined && g.interval > 1) {
          expect(label).toContain(String(g.interval))
        }

        if (g.byday !== undefined) {
          for (const code of g.byday) {
            const name = DAY_CODE_TO_NAME[code]
            expect(label).toContain(name)
          }
        }

        if (g.bymonthday !== undefined) {
          expect(label).toContain(String(g.bymonthday))
        }

        if (g.until !== undefined) {
          expect(label).toContain(String(g.until.year))
        }

        if (g.count !== undefined) {
          expect(label).toContain(String(g.count))
        }
      }),
      { numRuns: 100 }
    )
  })
})
