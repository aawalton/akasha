import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const stopGates = {
  id: "01a09b0a-a031-7f2c-928a-bfbf7e56eb21",
  type: "page-type/file-property",
  slug: "stop-gates",
  propertySlug: "stop-gates",
  definition: "how far a hook got before it let a turn end, one line appended as that run ends",
  extensions: ["jsonl"],
  generated: true,
  appendOnly: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line names where the run stopped rather than what the run judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that reached a model and a run that never did are told apart here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A line states how many rules were put to the model, which is none where none was put.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page states its own lines here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says what the model answered.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run that cannot be recorded is not a run that is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line names the seat the run was under, or no seat where the run knew none yet.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
