import type { Initiative } from "../initiative.page-type.ts"

export const veraGraphSystem = {
  id: "01a04fcf-588c-709e-ac5d-b7e289b49f86",
  pageTypeSlug: "initiative",
  slug: "vera-graph-system",
  domainSlug: "domain/graph-system",
  personaSlug: "vera",
  invariants: [
    {
      invariantKind: "gap",
      statement: "No answer rests on a question the corpus must be walked to settle.",
    },
    {
      invariantKind: "gap",
      statement: "No check's closure is beyond the analysis.",
    },
  ],
} as const satisfies Initiative
