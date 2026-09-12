import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const sortPropertyValuesOnEveryPage = {
  id: "01a095a8-fcf7-7a63-8a11-80ee5c1a3025",
  type: "change-agent",
  slug: "sort-property-values-on-every-page",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "the values one key holds carried into the order they sort in, on every page of one page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose values are already in order is passed over rather than reached.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page of which holds the key out of order is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The values left in place are the longest run already in order.",
    },
    {
      invariantKind: "departure",
      statement: "Every other value is taken out and put back, so the fewest values are carried.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages one run carries values on.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count carries values on every page holding the key out of order.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is reached over the edits the pages before it left.",
    },
    {
      invariantKind: "departure",
      statement: "Where a value goes back is left to the mechanical change putting one value in.",
    },
    {
      invariantKind: "departure",
      statement: "That change reads the order off the property rather than being told it here.",
    },
    {
      invariantKind: "departure",
      statement: "Those changes are reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      invariantKind: "absence",
      statement: "A key holding no list is passed over rather than refused.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
