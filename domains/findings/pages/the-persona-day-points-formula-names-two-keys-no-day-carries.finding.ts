import type { Finding } from "../finding.page-type.ts"

export const thePersonaDayPointsFormulaNamesTwoKeysNoDayCarries = {
  id: "01a0657f-1a2c-7001-8f3a-27d9c5e4b7a8",
  pageTypeSlug: "finding",
  slug: "the-persona-day-points-formula-names-two-keys-no-day-carries",
  domainSlug: "domain/persona-day-score",
  claim:
    "A persona day's points sum seven keys. Two of them, `strength-points` and `cardio-points`, have never once been written on a persona day, so both have counted as nothing for every day ever scored. What the days carry instead is `strength-volume` and `active-calories`, which the formula does not name.",
  evidence:
    "The formula carried across word for word from `pages/page-property-definition/persona-day-points` sums sleep-points, strength-points, cardio-points, nutrition-points, task-points, breathing-points and source-points. " +
    "Over all 2,079 persona days now standing, strength-points is written on 0 and cardio-points on 0. What is written is strength-volume on 63 and active-calories on 17, which the formula does not name. The other five it names are written: source-points 2079, task-points 76, sleep-points 63, nutrition-points 61, breathing-points 60. " +
    "The two are not invented names. Alan's own wake days carry strength-points on 7 of 134 and cardio-points on 3 of 134, beside strength-volume on 77 and active-calories on 34. So the scored key and the raw measure are two different keys, and the writer supplies the raw one to a persona day and the scored one almost never to anything. " +
    "That leaves two roads, and they are not equivalent. Either the daily tracking writer should put strength-points and cardio-points on a persona day as it does on a wake day, and the formula is already right; or the formula should name strength-volume and active-calories, which cannot simply be added, because a pound moved and a calorie burned are not points and would need a scale first. " +
    "Nothing was mended here. green-day-fraction and green-day-rung are read off this sum and Alan's whole green day history is scored by them, so changing it moves figures already recorded rather than fixing a migration. The stopgap is stated on the points property itself.",
} as const satisfies Finding
