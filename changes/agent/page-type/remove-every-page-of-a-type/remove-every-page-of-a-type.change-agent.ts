import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removeEveryPageOfAType = {
  id: "01a081bd-2930-7f0d-9324-5412a477c845",
  type: "change-agent",
  slug: "remove-every-page-of-a-type",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page of one page type taken away, each with the files beside it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is handed to the mechanical change taking every page of one away.",
    },
    {
      invariantKind: "departure",
      statement: "Every page of that page type is that change's one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A count is handed on and bounds how many pages that change takes away.",
    },
    {
      invariantKind: "departure",
      statement: "A count left out takes away every page of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no whole number above nothing is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The caller reaches this change again to take away the pages a count left.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from that change is the refusal this act gives.",
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
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "No change but that one rung is reached.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
