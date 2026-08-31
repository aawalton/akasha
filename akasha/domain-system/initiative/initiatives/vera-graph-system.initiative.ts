import type { Initiative } from "../initiative.page-type.ts"

export const veraGraphSystem = {
  id: "01a04fcf-588c-709e-ac5d-b7e289b49f86",
  pageTypeSlug: "initiative",
  slug: "vera-graph-system",
  domainSlug: "domain/graph-system",
  personaSlug: "vera",
  intents: [
    { statement: "A check narrows the change through one vocabulary." },
    { statement: "No check's closure is beyond the analysis." },
    { statement: "A derived closure is kept until the code it rests on changes." },
    { statement: "A check runs only for a change that could change its answer." },
    { statement: "No answer rests on a question the corpus must be walked to settle." },
  ],
} as const satisfies Initiative
