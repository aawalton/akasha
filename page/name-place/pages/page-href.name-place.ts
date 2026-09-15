import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const pageHref = {
  id: "01a04fd4-3d75-7213-bde5-59110fc1ae06",
  type: "page-type/name-place",
  slug: "page-href",
  definition: "the address a page is reached by from outside",
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is built of the page type's slug and the page's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each slug is named elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page's part has a tail taken from its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tail parts two pages of one slug without either page being renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part with a tail is no slug.",
    },
  ],
} as const satisfies NamePlace
