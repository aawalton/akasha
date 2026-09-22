import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removePropertyFromEveryPage = {
  id: "01a081b9-ad8c-70a8-ab31-382461b45312",
  type: "page-type/change-agent",
  slug: "remove-property-from-every-page",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a key taken off every page of a page type, with its values",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page type no longer declares goes from every page holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type no page of which holds the key is refused rather than left as no edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages the key goes from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count takes the key from every page holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page type requires is refused rather than taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page holding no such key is passed over rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal over a page names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key mistyped is caught here by no page of that page type holding the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change acts on a page type, as this one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
