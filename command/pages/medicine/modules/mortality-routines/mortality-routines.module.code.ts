import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Evidence = "trial" | "observational" | "confounded"

export type Routine =
  | "strengthMinutes"
  | "nutsGrams"
  | "wholeGrainGrams"
  | "fruitVegetableGrams"
  | "coffeeCups"
  | "saunaSessions"
  | "seatbelt"
  | "therapy"
  | "safetyPlan"
  | "flu"
  | "covid"
  | "psa"
  | "fitness"
  | "hotBaths"

export type Levels = Readonly<Record<Routine, number | null>>

export type Routines = { readonly now: Levels; readonly at: Levels }

export const MINUTES_PER_SET = 2.5

const STRENGTH_TARGET_SETS = 24

const CVD_NADIR_MINUTES = 60

const CANCER_NADIR_MINUTES = 30

const DIABETES_STEP_MINUTES = 10

const NUTS_UNIT_GRAMS = 28

const WHOLE_GRAIN_UNIT_GRAMS = 90

const WHOLE_GRAIN_TOP_GRAMS = 210

const FRUIT_UNIT_GRAMS = 200

const FRUIT_TOP_GRAMS = 800

const FRUIT_FLOOR_GRAMS = 160

const FRUIT_TARGET_GRAMS = 400

const BATHS_DAILY = 5

const SAUNA_TARGET = 4

const COVID_PROTECTED_SHARE = 113 / 365

const PSA_FROM_AGE = 55

export const VO2_PER_MET = 3.5

const REFERENCE_METS = 9.35

const FITNESS_GAIN_METS = 1.5

export function levelsOf(person: Value, strengthSetsPerWeek: number): Levels {
  const flag = (key: string): number | null =>
    person[key] === true ? 1 : person[key] === false ? 0 : null
  const chosen = (key: string, yes: string): number | null => {
    const said = textAt(person, key)
    return said === null ? null : said === yes ? 1 : 0
  }
  return {
    strengthMinutes: strengthSetsPerWeek * MINUTES_PER_SET,
    nutsGrams: numberAt(person, "nutsGramsPerDay"),
    wholeGrainGrams: numberAt(person, "wholeGrainGramsPerDay"),
    fruitVegetableGrams: numberAt(person, "fruitVegetableGramsPerDay"),
    coffeeCups: numberAt(person, "coffeeCupsPerDay"),
    saunaSessions: numberAt(person, "saunaSessionsPerWeek"),
    seatbelt: chosen("seatbeltUse", "always"),
    therapy: flag("inTherapyForDepression"),
    safetyPlan: flag("hasSafetyPlan"),
    flu: chosen("fluVaccination", "yearly"),
    covid: chosen("covidVaccination", "yearly"),
    psa: 0,
    fitness: numberAt(person, "vo2max"),
    hotBaths: numberAt(person, "hotBathsPerWeek"),
  }
}

export function routinesOf(now: Levels): Routines {
  return { now, at: now }
}

type Stepping = (at: number, now: number, age: number) => number

export type RoutineReading = {
  readonly factor: string
  readonly routine: Routine
  readonly step: Stepping
  readonly cluster?: string
  readonly whileDepressed?: boolean
  readonly assumed: string
}

export const DIET = "diet"

export const ACTIVITY = "activity"

const SUICIDE_CARE = "suicide care"

export function routineDose(reading: RoutineReading, routines: Routines, age: number): number {
  const at = routines.at[reading.routine]
  const now = routines.now[reading.routine]
  return at === null || now === null ? 0 : reading.step(at, now, age)
}

function capped(top: number, unit: number): Stepping {
  return (at, now) => (Math.min(at, top) - Math.min(now, top)) / unit
}

function within(low: number, high: number, unit: number): Stepping {
  const held = (one: number) => Math.min(Math.max(one, low), high)
  return (at, now) => (held(at) - held(now)) / unit
}

function band(from: number, below: number): Stepping {
  const inside = (one: number) => (one >= from && one < below ? 1 : 0)
  return (at, now) => inside(at) - inside(now)
}

const taken: Stepping = (at, now) => at - now

const drinking: Stepping = (at, now) => (at > 0 ? 1 : 0) - (now > 0 ? 1 : 0)

const MOVED =
  "only a change from Alan's current level moves this factor; the baseline is taken to hold his current level already (assumed)"

const STRENGTH_SAID = `minutes a week are Alan's logged strength sets a week, warm-ups and mobility and cardio sets left out, times ${MINUTES_PER_SET} minutes a set with rest (assumed); ${MOVED}`

function strength(factor: string, step: Stepping): RoutineReading {
  return { factor, routine: "strengthMinutes", step, assumed: STRENGTH_SAID }
}

function diet(factor: string, routine: Routine, step: Stepping, unit: string): RoutineReading {
  return {
    factor,
    routine,
    step,
    cluster: DIET,
    assumed: `${unit}; ${MOVED}; never multiplied with another diet factor on the same cause, where the larger effect counts`,
  }
}

const NUTS = "per 28 g a day, capped at 28 g"

function sauna(factor: string, from: number, below: number): RoutineReading {
  return {
    factor,
    routine: "saunaSessions",
    step: band(from, below),
    cluster: ACTIVITY,
    assumed: `against once a week, sessions ${from}${below === Number.POSITIVE_INFINITY ? " or more" : ` to ${below - 1}`}; ${MOVED}; never multiplied with steps, fitness or bathing on the same cause, where the larger effect counts`,
  }
}

function binary(
  factor: string,
  routine: Routine,
  assumed: string,
  step: Stepping = taken
): RoutineReading {
  return { factor, routine, step, assumed: `${assumed}; ${MOVED}` }
}

function care(factor: string, routine: Routine): RoutineReading {
  return {
    factor,
    routine,
    step: taken,
    cluster: SUICIDE_CARE,
    whileDepressed: true,
    assumed: `applies for the share of logged time below safety level 3; the source counts suicidal behaviour or repeated self-harm, read as suicide death; ${MOVED}; never multiplied with the other suicide care factor, where the larger effect counts`,
  }
}

const CVD = strength(
  "muscle-strengthening activity, cardiovascular disease",
  capped(CVD_NADIR_MINUTES, CVD_NADIR_MINUTES)
)

const CANCER = strength(
  "muscle-strengthening activity, total cancer",
  capped(CANCER_NADIR_MINUTES, CANCER_NADIR_MINUTES)
)

const FITNESS: RoutineReading = {
  factor: "cardiorespiratory fitness",
  routine: "fitness",
  step: (at) => at / VO2_PER_MET - REFERENCE_METS,
  cluster: ACTIVITY,
  assumed: `per 1 MET, VO2max over ${VO2_PER_MET} ml/kg/min; the people the baseline counts are taken at ${REFERENCE_METS} METs, the middle of the source's intermediate category of 7.9 to 10.8 METs (assumed); coronary and cardiovascular events are read as deaths; Alan's VO2max is the Apple Watch's estimate, and the range does not hold that estimate's error; never multiplied with steps, sauna or bathing on the same cause, where the larger effect counts`,
}

function bath(factor: string): RoutineReading {
  return {
    factor,
    routine: "hotBaths",
    step: band(BATHS_DAILY, Number.POSITIVE_INFINITY),
    cluster: ACTIVITY,
    assumed: `almost daily or daily, taken as ${BATHS_DAILY} or more a week (assumed), against 0 to 2 a week; a count between the source's bands, as 2.5 is, is read in the band below it (assumed); incidence is read as death; ${MOVED}; never multiplied with steps, fitness or sauna on the same cause, where the larger effect counts`,
  }
}

const SAUNA_CVD = [
  sauna("sauna 2 to 3 times a week, cardiovascular death", 2, 4),
  sauna("sauna 4 to 7 times a week, cardiovascular death", 4, Number.POSITIVE_INFINITY),
]

const NUTS_STEP = capped(NUTS_UNIT_GRAMS, NUTS_UNIT_GRAMS)

export const ROUTINE_READINGS: ReadonlyMap<string, readonly RoutineReading[]> = new Map([
  [
    "heart-disease",
    [
      CVD,
      FITNESS,
      diet("nuts, coronary heart disease", "nutsGrams", NUTS_STEP, NUTS),
      diet(
        "whole grains, coronary heart disease",
        "wholeGrainGrams",
        capped(WHOLE_GRAIN_TOP_GRAMS, WHOLE_GRAIN_UNIT_GRAMS),
        "per 90 g a day, capped at 210 g"
      ),
      ...SAUNA_CVD,
      bath("hot tub bathing almost daily, coronary heart disease"),
    ],
  ],
  [
    "stroke",
    [
      CVD,
      FITNESS,
      diet(
        "fruit and vegetables, stroke",
        "fruitVegetableGrams",
        capped(FRUIT_TOP_GRAMS, FRUIT_UNIT_GRAMS),
        "per 200 g a day, capped at 800 g where the source's curve flattens"
      ),
      ...SAUNA_CVD,
      bath("hot tub bathing almost daily, stroke"),
    ],
  ],
  [
    "chronic-lower-respiratory-disease",
    [
      diet("nuts, respiratory disease", "nutsGrams", NUTS_STEP, NUTS),
      diet(
        "fruit and vegetables, respiratory disease",
        "fruitVegetableGrams",
        within(FRUIT_FLOOR_GRAMS, FRUIT_TARGET_GRAMS, FRUIT_TARGET_GRAMS - FRUIT_FLOOR_GRAMS),
        "5 against 2 servings a day, a serving taken as 80 g, read straight between them and flat outside"
      ),
    ],
  ],
  [
    "diabetes",
    [
      strength(
        "muscle-strengthening activity, diabetes",
        capped(CVD_NADIR_MINUTES, DIABETES_STEP_MINUTES)
      ),
      diet("nuts, diabetes", "nutsGrams", NUTS_STEP, NUTS),
    ],
  ],
  ["lung-cancer", [CANCER]],
  ["other-cancer", [CANCER]],
  [
    "prostate-cancer",
    [
      CANCER,
      binary(
        "PSA screening",
        "psa",
        "invited to screening against not, from 55; Alan is taken as unscreened now",
        (at, now, age) => (age < PSA_FROM_AGE ? 0 : at - now)
      ),
    ],
  ],
  [
    "alzheimers-disease",
    [
      sauna("sauna 2 to 3 times a week, dementia", 2, 4),
      sauna("sauna 4 to 7 times a week, dementia", 4, Number.POSITIVE_INFINITY),
    ],
  ],
  [
    "parkinsons-disease",
    [
      binary(
        "coffee drinking",
        "coffeeCups",
        "any coffee against none; Parkinson's incidence is read as Parkinson's death",
        drinking
      ),
    ],
  ],
  [
    "motor-vehicle-crash",
    [binary("seatbelt use", "seatbelt", "a belt on every trip against none")],
  ],
  ["suicide", [care("CBT-based psychotherapy", "therapy"), care("safety planning", "safetyPlan")]],
  [
    "influenza-and-pneumonia",
    [binary("yearly influenza vaccination", "flu", "a shot every season against none")],
  ],
  [
    "covid-19",
    [
      binary(
        "COVID-19 vaccination",
        "covid",
        `a dose every autumn against none, protecting for the source's 7 to 119 days, ${Math.round(COVID_PROTECTED_SHARE * 100)}% of a year (assumed); visits are read as deaths`,
        (at, now) => (at - now) * COVID_PROTECTED_SHARE
      ),
    ],
  ],
])

export type RoutineLever = {
  readonly named: string
  readonly evidence: Evidence
  readonly routine: Routine
  readonly target: (now: number) => number
  readonly needs: string | null
  readonly caveat?: string
}

const atLeast = (level: number) => (now: number) => Math.max(now, level)

const always = () => 1

export const ROUTINE_LEVERS: readonly RoutineLever[] = [
  {
    named: `strength training up to ${STRENGTH_TARGET_SETS} sets a week`,
    evidence: "observational",
    routine: "strengthMinutes",
    target: atLeast(STRENGTH_TARGET_SETS * MINUTES_PER_SET),
    needs: null,
  },
  {
    named: "nuts up to 28 g a day",
    evidence: "observational",
    routine: "nutsGrams",
    target: atLeast(NUTS_UNIT_GRAMS),
    needs: "nuts-grams-per-day",
  },
  {
    named: "whole grains up to 90 g a day",
    evidence: "observational",
    routine: "wholeGrainGrams",
    target: atLeast(WHOLE_GRAIN_UNIT_GRAMS),
    needs: "whole-grain-grams-per-day",
  },
  {
    named: "fruit and vegetables up to 400 g a day",
    evidence: "observational",
    routine: "fruitVegetableGrams",
    target: atLeast(FRUIT_TARGET_GRAMS),
    needs: "fruit-vegetable-grams-per-day",
  },
  {
    named: "a cup of coffee a day",
    evidence: "observational",
    routine: "coffeeCups",
    target: atLeast(1),
    needs: "coffee-cups-per-day",
    caveat:
      "caffeine adds to a stimulant's side effects on heart rate, blood pressure, anxiety and sleep, and his stimulant already acts on dopamine",
  },
  {
    named: "fitness up 1.5 METs",
    evidence: "observational",
    routine: "fitness",
    target: (now) => now + FITNESS_GAIN_METS * VO2_PER_MET,
    needs: "vo2max",
  },
  {
    named: "sauna 4 times a week",
    evidence: "observational",
    routine: "saunaSessions",
    target: atLeast(SAUNA_TARGET),
    needs: "sauna-sessions-per-week",
  },
  {
    named: "a hot bath almost every day",
    evidence: "observational",
    routine: "hotBaths",
    target: atLeast(BATHS_DAILY),
    needs: "hot-baths-per-week",
  },
  {
    named: "a seatbelt on every trip",
    evidence: "observational",
    routine: "seatbelt",
    target: always,
    needs: "seatbelt-use",
  },
  {
    named: "CBT-based therapy for depression",
    evidence: "trial",
    routine: "therapy",
    target: always,
    needs: "in-therapy-for-depression",
  },
  {
    named: "a safety plan",
    evidence: "observational",
    routine: "safetyPlan",
    target: always,
    needs: "has-safety-plan",
  },
  {
    named: "a flu shot every year",
    evidence: "observational",
    routine: "flu",
    target: always,
    needs: "flu-vaccination",
  },
  {
    named: "a COVID-19 vaccine every autumn",
    evidence: "observational",
    routine: "covid",
    target: always,
    needs: "covid-vaccination",
  },
  {
    named: "PSA screening from 55",
    evidence: "trial",
    routine: "psa",
    target: always,
    needs: null,
  },
]

export function leveledBy(lever: RoutineLever, routines: Routines): Routines {
  const now = routines.now[lever.routine]
  return now === null
    ? routines
    : { ...routines, at: { ...routines.at, [lever.routine]: lever.target(now) } }
}

export function waitingOn(lever: RoutineLever, routines: Routines): string | null {
  return routines.now[lever.routine] === null ? lever.needs : null
}

export const UNMODELLED: readonly string[] = [
  "legumes: the source compares the highest intake with the lowest and names no cut-off, so no dose can be read",
  "fish: only an all-cause figure is verified, and an all-cause risk never stacks on a cause's own",
  "social connection: only all-cause figures are verified, and isolation overlaps the depression already read",
  "a lipid panel and A1c: testing alone moves nothing (1.00), and the benefit runs through a statin decision that rests on lipids nobody has measured",
  "a yearly blood pressure check: only an all-cause figure per 10 mmHg is verified, and its benefit depends on whether hypertension develops",
  "a pneumococcal vaccine from 50: the trial found no difference in deaths",
  "vigorous exercise against Parkinson's: the source doses moderate-to-vigorous MET-hours, which the logs do not measure",
]
