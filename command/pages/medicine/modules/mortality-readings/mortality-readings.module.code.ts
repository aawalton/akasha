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

const PEOPLE_BMI = 29.4

const BMI_STEP = 5

const POUNDS_TO_BMI = 703

const NEVER_SMOKED = "never smoking"

const NEVER_DRANK = "never drinking"

const BMI = "BMI"

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
  readonly neverSmoked: boolean
  readonly neverDrank: boolean
  readonly bmi: number | null
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

function bmiDose(changePoint: number): Dosing {
  return (held) =>
    held.bmi === null
      ? 0
      : (Math.max(held.bmi - changePoint, 0) - Math.max(PEOPLE_BMI - changePoint, 0)) / BMI_STEP
}

const neverSmokedDose: Dosing = (held) => (held.neverSmoked ? 1 : 0)

const neverDrankDose: Dosing = (held) => (held.neverDrank ? 1 : 0)

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

const STIMULANT_CARDIO_SAID =
  "applies where Alan's medications name a stimulant, as the source's odds ratio for more than 5 years of use, taken as reached now (his years of use are unknown); the source counts diagnoses, and adding deaths in a sensitivity analysis gave similar results; its yearly dose-response is significant only at 1.5 defined daily doses or more, and Alan takes about 1.1 (30 mg lisdexamfetamine at a DDD of 30 mg, plus 10 mg amphetamine a week at a DDD of 15 mg), so this cause-specific estimate pooled over doses is the source's nearest fit"

const NEVER_SMOKED_SAID =
  "applies where Alan's tobacco use is never; the relative risk is a never-smoker's rate over the population's, worked out on the page from the source's smoker ratios and men 65 and over's smoking shares, so it overstates the credit before 65 where more men never smoked"

const NEVER_DRANK_SAID =
  "applies where Alan drinks no alcohol in a week, read as never drinking; the alcohol-related share of these deaths is taken away and the rest is kept"

function bmiSaid(changePoint: number): string {
  return `BMI from bodyweight in pounds and height in inches; per 5 BMI above ${changePoint}, Alan's against the people the baseline counts, taken at the US male mean of ${PEOPLE_BMI}; the mean is used in place of the spread of BMI among them (assumed)`
}

function bmiReading(changePoint: number): Reading {
  return { factor: BMI, dose: bmiDose(changePoint), assumed: bmiSaid(changePoint) }
}

const SMOKED: Reading = { factor: NEVER_SMOKED, dose: neverSmokedDose, assumed: NEVER_SMOKED_SAID }

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

function cardioReadings(stimulant: string): readonly Reading[] {
  return [
    { factor: "daily steps", dose: stepsDose, assumed: STEPS_SAID },
    { factor: "sleep duration", dose: sleepDose, assumed: SLEEP_SAID },
    { factor: "red and processed meat", dose: meatServingDose, assumed: MEAT_SAID },
    { factor: stimulant, dose: stimulantDose, assumed: STIMULANT_CARDIO_SAID },
    SMOKED,
    bmiReading(25),
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

export function readingsFor(): ReadonlyMap<string, readonly Reading[]> {
  const cancer = bmiReading(21)
  return new Map<string, readonly Reading[]>([
    ["heart-disease", cardioReadings("ADHD medication over 5 years, ischaemic heart disease")],
    ["stroke", cardioReadings("ADHD medication over 5 years, cerebrovascular disease")],
    ["lung-cancer", [SMOKED, cancer]],
    ["chronic-lower-respiratory-disease", [SMOKED, bmiReading(25)]],
    ["pancreatic-cancer", [SMOKED, cancer]],
    [
      "colorectal-cancer",
      [
        { factor: "red and processed meat", dose: meatGramDose, assumed: MEAT_GRAMS_SAID },
        SMOKED,
        cancer,
      ],
    ],
    ["prostate-cancer", [SMOKED, cancer]],
    ["other-cancer", [cancer]],
    ["brain-cancer", [cancer]],
    [
      "chronic-liver-disease",
      [{ factor: NEVER_DRANK, dose: neverDrankDose, assumed: NEVER_DRANK_SAID }, bmiReading(23)],
    ],
    ["kidney-disease", [bmiReading(25)]],
    ["diabetes", [bmiReading(22)]],
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

export function habitsIn(person: Value): Pick<Held, "neverSmoked" | "neverDrank" | "bmi"> {
  const pounds = numberAt(person, "bodyweight")
  const inches = numberAt(person, "height")
  return {
    neverSmoked: textAt(person, "tobaccoUse") === "never",
    neverDrank: numberAt(person, "alcoholDrinksPerWeek") === 0,
    bmi:
      pounds === null || inches === null || inches <= 0
        ? null
        : (POUNDS_TO_BMI * pounds) / inches ** 2,
  }
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
  {
    named: "weight down to BMI 25",
    to: (held) => ({ ...held, bmi: held.bmi === null ? null : Math.min(held.bmi, 25) }),
  },
]

export const UNMODELLED: readonly string[] = []
