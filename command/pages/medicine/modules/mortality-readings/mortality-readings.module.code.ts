import {
  numberAt,
  recordsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const DAYS_PER_WEEK = 7

export const SELF = "self"

const STEPS_TOP = 7000

const STEPS_SPAN = 5000

const STEPS_PEOPLE = 5000

const MEAT_PEOPLE_PER_DAY = 0.7

const MEAT_GRAMS_PER_SERVING = 75

const MEAT_GRAMS_UNIT = 100

const SLEEP_FLOOR_HOURS = 7

const STIMULANT_YEARS_CAP = 10

const STIMULANT_YEARS_BEFORE = 0

const STIMULANT = /lisdexamfetamine|amphetamine|methylphenidate|vyvanse|adderall|ritalin/i

const FIRST_DEGREE = new Set(["father", "mother", "brother", "sister"])

export type Held = {
  readonly age: number
  readonly steps: number | null
  readonly sleepHours: number | null
  readonly meatPerDay: number
  readonly shareBelowThree: number
  readonly shareBelowZero: number
  readonly onStimulant: boolean
  readonly conditions: ReadonlyMap<string, string>
  readonly parkinsonsFirstDegree: boolean
}

type Dosing = (held: Held, age: number) => number

export type Reading = {
  readonly factor: string
  readonly dose: Dosing
  readonly share?: (held: Held) => number
  readonly condition?: string
  readonly assumed: string
}

const stepsDose: Dosing = (held) =>
  held.steps === null ? 0 : (Math.min(held.steps, STEPS_TOP) - STEPS_PEOPLE) / STEPS_SPAN

const sleepDose: Dosing = (held) =>
  held.sleepHours === null ? 0 : Math.max(held.sleepHours - SLEEP_FLOOR_HOURS, 0)

const meatServingDose: Dosing = (held) => held.meatPerDay - MEAT_PEOPLE_PER_DAY

const meatGramDose: Dosing = (held) =>
  ((held.meatPerDay - MEAT_PEOPLE_PER_DAY) * MEAT_GRAMS_PER_SERVING) / MEAT_GRAMS_UNIT

function stimulantYearsDose(start: number): Dosing {
  return (held, age) =>
    held.onStimulant ? Math.min(age - start + STIMULANT_YEARS_BEFORE, STIMULANT_YEARS_CAP) : 0
}

function conditionDose(condition: string): Dosing {
  return (held) => (held.conditions.has(condition) ? 1 : 0)
}

const stimulantDose: Dosing = (held) => (held.onStimulant ? 1 : 0)

const adhdStimulantDose: Dosing = (held) =>
  held.onStimulant && held.conditions.has("ADHD") ? 1 : 0

const parkinsonsDose: Dosing = (held) => (held.parkinsonsFirstDegree ? 1 : 0)

const always: Dosing = () => 1

const STEPS_SAID =
  "steps are Alan's mean over watch-on days; the source's line runs 2,000 to 7,000, so steps past 7,000 count as 7,000; the people the baseline counts are taken at 5,000 steps a day (assumed)"

const SLEEP_SAID =
  "per hour of mean logged sleep over 7 hours; the people the baseline counts are taken at 7 hours (assumed)"

const MEAT_SAID =
  "one serving a day per 7 servings a week; the people the baseline counts are taken at 0.7 servings a day (assumed)"

const MEAT_GRAMS_SAID = `${MEAT_SAID}; a serving is taken as 75 g, between the source's 100 g red and 50 g processed (assumed); colorectal cancer incidence is read as colorectal cancer death`

const STIMULANT_YEARS_SAID =
  "years of use count from Alan's age now, with no years before it (unknown, assumed 0), and stop counting at 10 years (assumed, near the source's follow-up); incident CVD is read as CVD death"

const ADHD_SAID =
  "applies where Alan's health conditions name ADHD; a self-diagnosed condition ranges from no added risk to the source's central value"

const ADHD_STIMULANT_SAID = "applies where Alan has ADHD and takes a stimulant his medications name"

const PARKINSONS_SAID =
  "applies where Alan's family history names Parkinson's in a parent or sibling; the source's odds ratio for diagnosis is read as a relative risk of Parkinson's death"

const STIMULANT_SUICIDE_SAID =
  "applies where Alan's medications name a stimulant; suicide-related events are read as suicide death"

const DEPRESSION_SAID =
  "applies for the share of logged time below safety level 3; self-diagnosed, so it ranges from no added risk to the source's central value"

const IDEATION_SAID =
  "applies for the share of logged time below safety level 0, on top of depression as the source says; self-diagnosed, so it ranges from no added risk to the source's central value"

function cardioReadings(start: number): readonly Reading[] {
  return [
    { factor: "daily steps", dose: stepsDose, assumed: STEPS_SAID },
    { factor: "sleep duration", dose: sleepDose, assumed: SLEEP_SAID },
    { factor: "red and processed meat", dose: meatServingDose, assumed: MEAT_SAID },
    {
      factor: "long-term ADHD medication",
      dose: stimulantYearsDose(start),
      assumed: STIMULANT_YEARS_SAID,
    },
  ]
}

const INJURY: readonly Reading[] = [
  { factor: "ADHD", dose: conditionDose("ADHD"), condition: "ADHD", assumed: ADHD_SAID },
  { factor: "ADHD medication", dose: adhdStimulantDose, assumed: ADHD_STIMULANT_SAID },
]

const SUICIDE: readonly Reading[] = [
  { factor: "ADHD", dose: conditionDose("ADHD"), condition: "ADHD", assumed: ADHD_SAID },
  { factor: "stimulant ADHD medication", dose: stimulantDose, assumed: STIMULANT_SUICIDE_SAID },
  {
    factor: "depression",
    dose: always,
    share: (held) => held.shareBelowThree,
    condition: "depression",
    assumed: DEPRESSION_SAID,
  },
  {
    factor: "suicidal ideation without an attempt",
    dose: always,
    share: (held) => held.shareBelowZero,
    condition: "suicidal ideation",
    assumed: IDEATION_SAID,
  },
]

export function readingsFor(start: number): ReadonlyMap<string, readonly Reading[]> {
  return new Map<string, readonly Reading[]>([
    ["heart-disease", cardioReadings(start)],
    ["stroke", cardioReadings(start)],
    [
      "colorectal-cancer",
      [{ factor: "red and processed meat", dose: meatGramDose, assumed: MEAT_GRAMS_SAID }],
    ],
    [
      "parkinsons-disease",
      [
        {
          factor: "Parkinson's disease in a first-degree relative",
          dose: parkinsonsDose,
          assumed: PARKINSONS_SAID,
        },
      ],
    ],
    ["motor-vehicle-crash", INJURY],
    ["accidental-poisoning", INJURY],
    ["accidental-fall", INJURY],
    ["other-unintentional-injury", INJURY],
    ["suicide", SUICIDE],
  ])
}

export function onStimulantIn(person: Value): boolean {
  return recordsIn(person.medications).some((one) => STIMULANT.test(textAt(one, "name") ?? ""))
}

export function conditionsIn(person: Value): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const one of recordsIn(person.healthConditions)) {
    const named = textAt(one, "condition")
    if (named !== null) held.set(named, textAt(one, "diagnosedBy") ?? SELF)
  }
  return held
}

export function parkinsonsIn(person: Value): boolean {
  return recordsIn(person.familyHistory).some(
    (one) =>
      FIRST_DEGREE.has(textAt(one, "relative") ?? "") &&
      /parkinson/i.test(textAt(one, "condition") ?? "")
  )
}

export function meatPerDayIn(person: Value): number {
  return (numberAt(person, "meatServingsPerWeek") ?? 0) / DAYS_PER_WEEK
}

export type Lever = {
  readonly named: string
  readonly to: (held: Held) => Held
}

export const LEVERS: readonly Lever[] = [
  {
    named: "steps up to 7,000 a day",
    to: (held) => ({
      ...held,
      steps: held.steps === null ? STEPS_TOP : Math.max(held.steps, STEPS_TOP),
    }),
  },
  { named: "no red or processed meat", to: (held) => ({ ...held, meatPerDay: 0 }) },
  {
    named: "sleep down to 7 hours",
    to: (held) => ({
      ...held,
      sleepHours: held.sleepHours === null ? null : Math.min(held.sleepHours, SLEEP_FLOOR_HOURS),
    }),
  },
  { named: "stopping stimulants", to: (held) => ({ ...held, onStimulant: false }) },
]

export const UNMODELLED: readonly string[] = [
  "BMI: no cause-of-death page carries a verified BMI risk factor, so lowering it moves nothing here",
]
