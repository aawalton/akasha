import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const jennyCost = {
  id: "01a08bb2-255f-7fcd-be97-19292bc4115b",
  pageTypeSlug: "route",
  type: "route",
  slug: "jenny-cost",
  definition: "Alan's cost as the color Jenny's tile draws that cost in",
  code: "ts",
  test: "ts",
  urlPath: "api/cost",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The answering is the cost stoplight module's and the wiring is all that is here.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts answered are the ones whose page names the cost group.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's label and wire key are read off that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "The color is the cost read together with the tier the surplus reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The cost served here is Alan's rather than Jenny's.",
    },
    {
      invariantKind: "departure",
      statement:
        "Jenny's tile and Alan's site show one reading rather than two readings taken twice.",
    },
    {
      invariantKind: "departure",
      statement: "Both readings are carried in rather than taken here.",
    },
    {
      invariantKind: "departure",
      statement: "A caller into this ring presents Jenny's ring credential.",
    },
    {
      invariantKind: "departure",
      statement: "A cost with nothing carried in answers a stoplight with no figure.",
    },
    {
      invariantKind: "departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      invariantKind: "constraint",
      statement: "Jenny's shipped widget decodes `stoplights` as a list with at least one.",
    },
    {
      invariantKind: "constraint",
      statement: "Jenny's shipped widget decodes a stoplight's tier as one of six color names.",
    },
    {
      invariantKind: "departure",
      statement: "The cost this route's tests read is a fixture rather than the cost Alan is at.",
    },
  ],
} as const satisfies Route
