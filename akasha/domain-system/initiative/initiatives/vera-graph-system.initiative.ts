import type { Initiative } from "../initiative.page-type.ts"

export const veraGraphSystem = {
  id: "01a04fcf-588c-709e-ac5d-b7e289b49f86",
  pageTypeSlug: "initiative",
  slug: "vera-graph-system",
  domainSlug: "workspace-package/graph-system",
  personaSlug: "vera",
  intents: [
    {
      statement: "A check's stated input is no wider than what its answer rests on.",
      workingMemory:
        "`FILES`, `TEXTS` and `PAGES` stand in `change-walking`; `judgingEach` builds a check from one and `input` lays one on a check keeping its own walking. All thirty-eight state an input: seven sleep for a `.md` and ten for a non-page `.ts`, and `tests-pass` sleeps for 783 of 1299 `.ts` files. A test in `checking` runs every check over a change its input turns away and asks for no refusal.",
    },
    { statement: "No answer rests on a question the pages must be walked to settle." },
  ],
} as const satisfies Initiative
