import type { Finding } from "../finding.page-type.ts"

export const thePersonaDayPointsFormulaNamesTwoKeysNoDayCarries = {
  id: "01a0657f-1a2c-7001-8f3a-27d9c5e4b7a8",
  pageTypeSlug: "finding",
  slug: "the-persona-day-points-formula-names-two-keys-no-day-carries",
  domainSlug: "domain/akasha-migration",
  claim:
    "A persona day's points are summed over seven keys, two of which no persona day has ever carried, so strength and cardio have counted as nothing for every day ever scored.",
  evidence:
    "The formula carried across from `pages/page-property-definition/persona-day-points` sums sleep-points, strength-points, cardio-points, nutrition-points, task-points, breathing-points and source-points. " +
    "Over all 2,079 persona days the keys actually carried were source-points 2079, green-day-points 2079, value-slug 2077, source-total-snapshot 383, task-points 76, strength-volume 63, sleep-points 63, nutrition-points 61, breathing-points 60, byte-points 20 and active-calories 17. " +
    "Neither strength-points nor cardio-points appears once. What the days do carry is strength-volume and active-calories, which the formula does not name. " +
    "The formula was carried across word for word rather than mended, because green-day-fraction and green-day-rung are read off it and Alan's whole green day history is scored by them: mending it would move figures already recorded rather than fix a migration. " +
    "It is filed here so the choice is Alan's. The stopgap is stated on the points property itself.",
} as const satisfies Finding
