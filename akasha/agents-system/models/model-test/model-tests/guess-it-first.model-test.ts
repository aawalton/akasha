import type { ModelTest } from "../model-test.page-type.ts"

export const guessItFirst = {
  id: "01a053eb-6b28-7cbd-a860-fcc5c4551a00",
  pageTypeSlug: "model-test",
  slug: "guess-it-first",
  definition: "whether a departure names a decision that could have gone another way",
  modelFamilySlug: "model-family/haiku",
  prompt:
    "Below is an invariant from a software system's design documentation. It is stated as a departure: a decision a reader would not guess right.\n\nA decision implies there was another way it could have gone.\n\nState the alternative that was rejected. Then say whether a competent engineer, designing this system without having read this line, might plausibly have chosen that alternative instead.\n\nEnd with one word on its own line: PLAUSIBLE if they might have, ABSURD if no one would.\n\nThe invariant:",
  cases: "jsonl",
} as const satisfies ModelTest
