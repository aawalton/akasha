import { expect, test } from "bun:test"
import {
  type RruleValue,
  rruleWording,
  ruleWording,
} from "akasha/page/core/property-type/modules/rrule-wording/rrule-wording.module.code.ts"

const NOW = "2026-09-21T12:00:00.000Z"

function said(rule: string): string {
  return ruleWording(rule, NOW)
}

test("a daily rule reads as its interval", () => {
  expect(said("FREQ=DAILY")).toBe("Daily")
  expect(said("FREQ=DAILY;INTERVAL=2")).toBe("Every other day")
  expect(said("FREQ=DAILY;INTERVAL=3")).toBe("Every 3 days")
})

test("a weekly rule naming no day reads as its interval", () => {
  expect(said("FREQ=WEEKLY")).toBe("Weekly")
  expect(said("FREQ=WEEKLY;INTERVAL=2")).toBe("Every other week")
  expect(said("FREQ=WEEKLY;INTERVAL=4")).toBe("Every 4 weeks")
})

test("a weekly rule naming one day reads as that day", () => {
  expect(said("FREQ=WEEKLY;BYDAY=TU")).toBe("Every Tuesday")
  expect(said("FREQ=WEEKLY;INTERVAL=2;BYDAY=TU")).toBe("Every other Tuesday")
  expect(said("FREQ=WEEKLY;INTERVAL=3;BYDAY=TU")).toBe("Every 3 weeks on Tuesday")
})

test("a weekly rule naming several days reads as those days shortened", () => {
  expect(said("FREQ=WEEKLY;BYDAY=MO,WE,FR")).toBe("Mon, Wed & Fri")
  expect(said("FREQ=WEEKLY;BYDAY=MO,WE")).toBe("Mon & Wed")
})

test("the days are said in week order whatever order the rule names them", () => {
  expect(said("FREQ=WEEKLY;BYDAY=FR,MO,WE")).toBe("Mon, Wed & Fri")
})

test("a weekly rule naming the working week reads as the weekdays", () => {
  expect(said("FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR")).toBe("Weekdays")
})

test("a weekly rule naming Saturday and Sunday reads as the weekends", () => {
  expect(said("FREQ=WEEKLY;BYDAY=SA,SU")).toBe("Weekends")
})

test("a weekly rule naming all seven days reads as daily", () => {
  expect(said("FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA,SU")).toBe("Daily")
})

test("a weekly rule naming several days over an interval says the interval first", () => {
  expect(said("FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR")).toBe("Every other week on Mon, Wed & Fri")
})

test("a monthly rule reads as its interval", () => {
  expect(said("FREQ=MONTHLY")).toBe("Monthly")
  expect(said("FREQ=MONTHLY;INTERVAL=2")).toBe("Every other month")
  expect(said("FREQ=MONTHLY;INTERVAL=3")).toBe("Quarterly")
  expect(said("FREQ=MONTHLY;INTERVAL=6")).toBe("Every 6 months")
})

test("a monthly rule naming a day of the month reads as that day's ordinal", () => {
  expect(said("FREQ=MONTHLY;BYMONTHDAY=1")).toBe("Monthly on the 1st")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=2")).toBe("Monthly on the 2nd")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=3")).toBe("Monthly on the 3rd")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=4")).toBe("Monthly on the 4th")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=11")).toBe("Monthly on the 11th")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=21")).toBe("Monthly on the 21st")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=22")).toBe("Monthly on the 22nd")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=23")).toBe("Monthly on the 23rd")
  expect(said("FREQ=MONTHLY;BYMONTHDAY=31")).toBe("Monthly on the 31st")
})

test("a monthly rule counting one day back reads as the last day of the month", () => {
  expect(said("FREQ=MONTHLY;BYMONTHDAY=-1")).toBe("Last day of the month")
  expect(said("FREQ=MONTHLY;INTERVAL=2;BYMONTHDAY=-1")).toBe("Every other month on the last day")
})

test("a monthly rule naming a day of the month over an interval keeps the ordinal", () => {
  expect(said("FREQ=MONTHLY;INTERVAL=2;BYMONTHDAY=1")).toBe("Every other month on the 1st")
})

test("a monthly rule naming a numbered weekday reads as that weekday", () => {
  expect(said("FREQ=MONTHLY;BYDAY=1MO")).toBe("First Monday")
  expect(said("FREQ=MONTHLY;BYDAY=2TU")).toBe("Second Tuesday")
  expect(said("FREQ=MONTHLY;BYDAY=-1FR")).toBe("Last Friday")
})

test("a monthly rule carrying the number on its position reads the same way", () => {
  expect(said("FREQ=MONTHLY;BYDAY=TU;BYSETPOS=2")).toBe("Second Tuesday")
  expect(said("FREQ=MONTHLY;BYDAY=FR;BYSETPOS=-1")).toBe("Last Friday")
})

test("a monthly rule naming a numbered weekday over an interval says the interval first", () => {
  expect(said("FREQ=MONTHLY;INTERVAL=2;BYDAY=1MO")).toBe("Every other month on the first Monday")
})

test("a monthly rule naming several numbered weekdays of one day says the numbers together", () => {
  expect(said("FREQ=MONTHLY;BYDAY=2MO,4MO")).toBe("Second & fourth Monday")
  expect(said("FREQ=MONTHLY;BYDAY=4MO,2MO")).toBe("Second & fourth Monday")
  expect(said("FREQ=MONTHLY;BYDAY=-1MO,1MO,3MO")).toBe("First, third & last Monday")
})

test("a monthly rule naming numbered weekdays of different days says each with its number", () => {
  expect(said("FREQ=MONTHLY;BYDAY=1MO,3FR")).toBe("First Monday & third Friday")
  expect(said("FREQ=MONTHLY;BYDAY=3FR,1MO")).toBe("First Monday & third Friday")
  expect(said("FREQ=MONTHLY;BYDAY=1FR,1MO")).toBe("First Monday & first Friday")
})

test("a monthly rule naming several numbered weekdays over an interval says the interval first", () => {
  expect(said("FREQ=MONTHLY;INTERVAL=2;BYDAY=2MO,4MO")).toBe(
    "Every other month on the second & fourth Monday"
  )
})

test("a monthly rule naming several weekdays is not covered where one of them has no number", () => {
  expect(said("FREQ=MONTHLY;BYDAY=MO,FR")).toBe("FREQ=MONTHLY;BYDAY=MO,FR")
  expect(said("FREQ=MONTHLY;BYDAY=2MO,-2MO")).toBe("FREQ=MONTHLY;BYDAY=2MO,-2MO")
  expect(said("FREQ=MONTHLY;BYDAY=2MO,4MO;BYSETPOS=1")).toBe(
    "FREQ=MONTHLY;BYDAY=2MO,4MO;BYSETPOS=1"
  )
})

test("a yearly rule reads as its interval", () => {
  expect(said("FREQ=YEARLY")).toBe("Yearly")
  expect(said("FREQ=YEARLY;INTERVAL=2")).toBe("Every other year")
  expect(said("FREQ=YEARLY;INTERVAL=5")).toBe("Every 5 years")
})

test("a yearly rule naming a month and a day reads as that date", () => {
  expect(said("FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=14")).toBe("Every 14 March")
})

test("a yearly rule naming a month alone reads as that month", () => {
  expect(said("FREQ=YEARLY;BYMONTH=3")).toBe("Every March")
})

test("an hourly rule reads as its interval", () => {
  expect(said("FREQ=HOURLY")).toBe("Hourly")
  expect(said("FREQ=HOURLY;INTERVAL=2")).toBe("Every other hour")
  expect(said("FREQ=HOURLY;INTERVAL=6")).toBe("Every 6 hours")
})

test("a minutely rule reads as its interval", () => {
  expect(said("FREQ=MINUTELY")).toBe("Every minute")
  expect(said("FREQ=MINUTELY;INTERVAL=2")).toBe("Every other minute")
  expect(said("FREQ=MINUTELY;INTERVAL=30")).toBe("Every 30 minutes")
})

test("a rule bound by a count says how many times", () => {
  expect(said("FREQ=DAILY;COUNT=10")).toBe("Daily, 10 times")
  expect(said("FREQ=WEEKLY;BYDAY=TU;COUNT=3")).toBe("Every Tuesday, 3 times")
})

test("a rule bound to one occurrence says once rather than one time", () => {
  expect(said("FREQ=DAILY;COUNT=1")).toBe("Daily, once")
})

test("a rule bound to a date in the year now says that date without its year", () => {
  expect(said("FREQ=DAILY;UNTIL=20260314T000000Z")).toBe("Daily, until 14 Mar")
  expect(said("FREQ=WEEKLY;BYDAY=MO;UNTIL=20261225T000000Z")).toBe("Every Monday, until 25 Dec")
})

test("a rule bound to a date outside the year now says that date with its year", () => {
  expect(said("FREQ=DAILY;UNTIL=20271114T000000Z")).toBe("Daily, until 14 Nov 2027")
  expect(said("FREQ=DAILY;UNTIL=20250314T000000Z")).toBe("Daily, until 14 Mar 2025")
})

test("the year now is read off the instant handed in rather than off the clock", () => {
  expect(ruleWording("FREQ=DAILY;UNTIL=20271114T000000Z", "2027-01-04T12:00:00.000Z")).toBe(
    "Daily, until 14 Nov"
  )
  const later = new Date("2028-01-04T12:00:00.000Z")
  expect(ruleWording("FREQ=DAILY;UNTIL=20271114T000000Z", later)).toBe("Daily, until 14 Nov 2027")
})

test("a value anchored from completion says so after the wording", () => {
  const value: RruleValue = { rule: "FREQ=DAILY;INTERVAL=3", anchorFromCompletion: true }
  expect(rruleWording(value, NOW)).toBe("Every 3 days after each completion")
})

test("a value anchored from completion says so before its bound", () => {
  const value: RruleValue = { rule: "FREQ=WEEKLY;BYDAY=TU;COUNT=3", anchorFromCompletion: true }
  expect(rruleWording(value, NOW)).toBe("Every Tuesday after each completion, 3 times")
})

test("a value anchored on nothing says nothing of completion", () => {
  const value: RruleValue = { rule: "FREQ=DAILY", anchorFromCompletion: false }
  expect(rruleWording(value, NOW)).toBe("Daily")
})

test("a rule that will not parse reads as the text it was", () => {
  expect(said("nonsense")).toBe("nonsense")
  expect(said("FREQ=NOPE")).toBe("FREQ=NOPE")
  expect(said("")).toBe("")
  expect(rruleWording({ rule: "nonsense", anchorFromCompletion: true }, NOW)).toBe("nonsense")
})

test("a rule this wording does not cover reads as the text it was", () => {
  expect(said("FREQ=SECONDLY")).toBe("FREQ=SECONDLY")
  expect(said("FREQ=DAILY;BYHOUR=9")).toBe("FREQ=DAILY;BYHOUR=9")
  expect(said("FREQ=MONTHLY;BYDAY=-2FR")).toBe("FREQ=MONTHLY;BYDAY=-2FR")
  expect(said("FREQ=WEEKLY;BYDAY=MO;COUNT=2;UNTIL=20271114T000000Z")).toBe(
    "FREQ=WEEKLY;BYDAY=MO;COUNT=2;UNTIL=20271114T000000Z"
  )
})
