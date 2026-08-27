import { describe, expect, it } from "bun:test"
import { labelRrule } from "./labeling"

const calendar = { anchorFromCompletion: false } as const
const fromCompletion = { anchorFromCompletion: true } as const

describe("labelRrule — happy path single directive", () => {
  it("FREQ=DAILY → 'Daily'", () => {
    expect(labelRrule("FREQ=DAILY", calendar)).toBe("Daily")
  })

  it("FREQ=WEEKLY → 'Weekly'", () => {
    expect(labelRrule("FREQ=WEEKLY", calendar)).toBe("Weekly")
  })

  it("FREQ=MONTHLY → 'Monthly'", () => {
    expect(labelRrule("FREQ=MONTHLY", calendar)).toBe("Monthly")
  })

  it("FREQ=YEARLY → 'Yearly'", () => {
    expect(labelRrule("FREQ=YEARLY", calendar)).toBe("Yearly")
  })

  it("FREQ=HOURLY → 'Hourly'", () => {
    expect(labelRrule("FREQ=HOURLY", calendar)).toBe("Hourly")
  })

  it("FREQ=MINUTELY → mentions minute", () => {
    const label = labelRrule("FREQ=MINUTELY", calendar)
    expect(label.toLowerCase()).toContain("minute")
  })
})

describe("labelRrule — INTERVAL ≠ 1", () => {
  it("FREQ=DAILY;INTERVAL=2 → 'Every 2 days'", () => {
    const label = labelRrule("FREQ=DAILY;INTERVAL=2", calendar)
    expect(label).toContain("2")
    expect(label.toLowerCase()).toContain("day")
  })

  it("FREQ=WEEKLY;INTERVAL=3 → 'Every 3 weeks'", () => {
    const label = labelRrule("FREQ=WEEKLY;INTERVAL=3", calendar)
    expect(label).toContain("3")
    expect(label.toLowerCase()).toContain("week")
  })
})

describe("labelRrule — BYDAY without ordinal", () => {
  it("FREQ=WEEKLY;BYDAY=MO → contains Mon", () => {
    const label = labelRrule("FREQ=WEEKLY;BYDAY=MO", calendar)
    expect(label).toContain("Mon")
  })

  it("FREQ=WEEKLY;BYDAY=MO,WE,FR → contains all three days", () => {
    const label = labelRrule("FREQ=WEEKLY;BYDAY=MO,WE,FR", calendar)
    expect(label).toContain("Mon")
    expect(label).toContain("Wed")
    expect(label).toContain("Fri")
  })
})

describe("labelRrule — BYDAY with ordinal", () => {
  it("FREQ=MONTHLY;BYDAY=2MO → contains '2nd' and 'Mon'", () => {
    const label = labelRrule("FREQ=MONTHLY;BYDAY=2MO", calendar)
    expect(label).toContain("2nd")
    expect(label).toContain("Mon")
  })
})

describe("labelRrule — BYMONTHDAY", () => {
  it("FREQ=MONTHLY;BYMONTHDAY=15 → contains '15'", () => {
    const label = labelRrule("FREQ=MONTHLY;BYMONTHDAY=15", calendar)
    expect(label).toContain("15")
  })
})

describe("labelRrule — BYMONTH", () => {
  it("FREQ=YEARLY;BYMONTH=3 → contains 'March' or 'Mar'", () => {
    const label = labelRrule("FREQ=YEARLY;BYMONTH=3", calendar)
    expect(label.includes("March") || label.includes("Mar")).toBe(true)
  })
})

describe("labelRrule — BYHOUR", () => {
  it("FREQ=DAILY;BYHOUR=9 → contains '9'", () => {
    const label = labelRrule("FREQ=DAILY;BYHOUR=9", calendar)
    expect(label).toContain("9")
  })
})

describe("labelRrule — UNTIL", () => {
  it("FREQ=WEEKLY;BYDAY=MO;UNTIL=20260601T000000Z → contains 'Mon' and the date", () => {
    const label = labelRrule("FREQ=WEEKLY;BYDAY=MO;UNTIL=20260601T000000Z", calendar)
    expect(label).toContain("Mon")
    const hasDate =
      label.includes("2026") &&
      (label.includes("Jun") || label.includes("06") || label.includes("June"))
    expect(hasDate).toBe(true)
  })
})

describe("labelRrule — COUNT", () => {
  it("FREQ=DAILY;COUNT=10 → contains 'Daily' and '10'", () => {
    const label = labelRrule("FREQ=DAILY;COUNT=10", calendar)
    expect(label).toContain("10")
    expect(label.toLowerCase()).toContain("dai")
  })
})

describe("labelRrule — combined directives", () => {
  it("FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;COUNT=5 → all directives represented", () => {
    const label = labelRrule("FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;COUNT=5", calendar)
    expect(label).toContain("Mon")
    expect(label).toContain("Wed")
    expect(label).toContain("5")
    expect(label).toContain("2")
    expect(label.toLowerCase()).toContain("week")
  })
})

describe("labelRrule — RRULE: prefix tolerance", () => {
  it("RRULE:FREQ=DAILY and FREQ=DAILY produce identical output", () => {
    const a = labelRrule("RRULE:FREQ=DAILY", calendar)
    const b = labelRrule("FREQ=DAILY", calendar)
    expect(a).toBe(b)
  })
})

describe("labelRrule — anchorFromCompletion suffix", () => {
  it("anchorFromCompletion: false → no completion suffix", () => {
    const label = labelRrule("FREQ=DAILY", calendar)
    expect(label.toLowerCase()).not.toContain("completion")
  })

  it("anchorFromCompletion: true → mentions 'completion'", () => {
    const label = labelRrule("FREQ=DAILY", fromCompletion)
    expect(label.toLowerCase()).toContain("completion")
  })
})

describe("labelRrule — throws on unsupported directives", () => {
  it("throws on BYSECOND", () => {
    expect(() => labelRrule("FREQ=WEEKLY;BYSECOND=30", calendar)).toThrow()
  })

  it("throws on BYMINUTE", () => {
    expect(() => labelRrule("FREQ=WEEKLY;BYMINUTE=15", calendar)).toThrow()
  })

  it("throws on BYSETPOS", () => {
    expect(() => labelRrule("FREQ=MONTHLY;BYSETPOS=-1;BYDAY=MO,TU,WE,TH,FR", calendar)).toThrow()
  })

  it("throws on WKST", () => {
    expect(() => labelRrule("FREQ=WEEKLY;WKST=SU", calendar)).toThrow()
  })

  it("throws on rules rrule.toText cannot fully convert (UNTIL+COUNT)", () => {
    expect(() => labelRrule("FREQ=DAILY;UNTIL=20260601T000000Z;COUNT=5", calendar)).toThrow()
  })
})

describe("labelRrule — throws on malformed input", () => {
  it("throws on non-rrule string", () => {
    expect(() => labelRrule("not an rrule", calendar)).toThrow()
  })
})
