import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const moveSubagentPageType = {
  id: "01a09b72-187a-75f6-a1be-65648a0e91df",
  type: "change-agent",
  slug: "move-subagent-page-type",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition:
    "a page type moved and the mortal pages left under its old folder taken away together",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page left under the old folder is taken away rather than carried.",
    },
    {
      invariantKind: "departure",
      statement:
        "The removal and the move are worked out in one action, so no page is born between them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page taken away here is one its writer writes again where the page type now sits.",
    },
    {
      invariantKind: "departure",
      statement: "Each part is left to the mechanical change doing that part.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
