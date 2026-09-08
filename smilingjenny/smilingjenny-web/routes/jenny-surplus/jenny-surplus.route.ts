import type { Route } from "@akasha/code/route"

export const jennySurplus = {
  id: "01a07c5d-9ae4-79ac-8807-7f63c08e44df",
  pageTypeSlug: "route",
  slug: "jenny-surplus",
  definition: "Alan's surplus as the color Jenny's tile draws that surplus in",
  code: "ts",
  test: "ts",
  urlPath: "api/surplus",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The group of readings served is the one thing named here.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts the group has are read off the readout pages.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's label is read off that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's scale is read off that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus served here is Alan's rather than Jenny's.",
    },
    {
      invariantKind: "departure",
      statement:
        "Jenny's tile and Alan's site show one reading rather than two readings taken twice.",
    },
    {
      invariantKind: "departure",
      statement: "A caller into this ring presents Jenny's ring credential.",
    },
    {
      invariantKind: "departure",
      statement: "A group with nothing carried in answers 503.",
    },
    {
      invariantKind: "departure",
      statement: "A widget reading 503 draws no signal.",
    },
  ],
} as const satisfies Route
