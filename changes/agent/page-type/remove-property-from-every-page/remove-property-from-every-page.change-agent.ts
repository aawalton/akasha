import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removePropertyFromEveryPage = {
  id: "01a081b9-ad8c-70a8-ab31-382461b45312",
  type: "change-agent",
  slug: "remove-property-from-every-page",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one key taken off every page of one page type, with its values",
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
      statement: "A key the page type no longer declares goes from every page holding it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type no page of which holds the key is refused rather than left as no edit.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages the key goes from.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count takes the key from every page holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type requires is refused rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A page holding no such key is passed over rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal over a page names that page.",
    },
    {
      invariantKind: "departure",
      statement: "A key mistyped is caught here by no page of that page type holding the key.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "That change acts on a page type, as this one does.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
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
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
