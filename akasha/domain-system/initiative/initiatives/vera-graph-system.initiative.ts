import type { Initiative } from "../initiative.page-type.ts"

export const veraGraphSystem = {
  id: "01a04fcf-588c-709e-ac5d-b7e289b49f86",
  pageTypeSlug: "initiative",
  slug: "vera-graph-system",
  domainSlug: "workspace-package/graph-system",
  personaSlug: "vera",
  intents: [
    {
      statement: "Every check says what it runs on.",
      workingMemory:
        "A selector says what a check runs on and wakes on every path it hands over. `FILES`, `TEXTS` and `PAGES` stand in `change-walking`; `judgingEach` builds a check from one, `waking` lays one on a check that keeps its own walking, and `checksWoken` skips a check whose waking no changed path answers. Twenty-two of thirty-six are bound: a non-page `.ts` sleeps seven, a `.md` eighteen. A test runs every bound check over a change its waking turns away and asks for no refusal.",
    },
    { statement: "A check's waking is no wider than what it runs on." },
    { statement: "No answer rests on a question the corpus must be walked to settle." },
  ],
} as const satisfies Initiative
