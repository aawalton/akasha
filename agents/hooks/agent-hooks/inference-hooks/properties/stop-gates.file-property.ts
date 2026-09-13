import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const stopGates = {
  id: "01a09b0a-a031-7f2c-928a-bfbf7e56eb21",
  type: "file-property",
  slug: "stop-gates",
  propertySlug: "stop-gates",
  definition: "how far a hook got before it let a turn end, one line appended as that run ends",
  extensions: ["jsonl"],
  generated: true,
  appendOnly: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line names where the run stopped rather than what the run judged.",
    },
    {
      invariantKind: "departure",
      statement: "A run that reached a model and a run that never did are told apart here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A line states how many rules were put to the model, which is none where none was put.",
    },
    {
      invariantKind: "departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "No page states its own lines here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what the model answered.",
    },
    {
      invariantKind: "absence",
      statement: "A run that cannot be recorded is not a run that is refused.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
