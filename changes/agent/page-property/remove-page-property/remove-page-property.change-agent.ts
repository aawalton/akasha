import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removePageProperty = {
  id: "01a09c7a-b119-731f-b1f7-be0c81d02238",
  type: "change-agent",
  slug: "remove-page-property",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property",
  definition: "one page property taken away, off every page with it and off every page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument this change was handed no value for is refused by its key.",
    },
    {
      invariantKind: "departure",
      statement: "The whole removal is worked out by the one rung this change reaches.",
    },
    {
      invariantKind: "departure",
      statement:
        "That rung is reached through the runner rather than by importing that rung's code.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
