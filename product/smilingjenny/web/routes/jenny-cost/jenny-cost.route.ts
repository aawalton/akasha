import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyCost = {
  id: "01a08bb2-255f-7fcd-be97-19292bc4115b",
  type: "page-type/route",
  slug: "jenny-cost",
  definition: "Alan's cost as the color Jenny's tile draws that cost in",
  code: "ts",
  test: "ts",
  urlPath: "api/cost",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The cost stoplight module does the answering and this page does the wiring alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readouts answered are the ones whose page names the cost group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout's label and wire key are read off that readout's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color is the cost read together with the surplus in hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cost served here is Alan's rather than Jenny's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Jenny's tile and Alan's site show one reading rather than two readings taken twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both readings are carried in rather than taken here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller into this ring presents Jenny's ring credential.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost with nothing carried in answers a stoplight with no figure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "Jenny's shipped widget decodes `stoplights` as a list holding at least one stoplight.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Jenny's shipped widget decodes a stoplight's tier as one of six color names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cost this route's tests read is a fixture rather than the cost Alan is at.",
    },
  ],
} as const satisfies Route
