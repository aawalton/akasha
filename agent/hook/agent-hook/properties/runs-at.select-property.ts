import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const runsAt = {
  id: "01a04e0a-f8fb-7beb-b0b8-ac268528b27e",
  type: "page-type/select-property",
  slug: "runs-at",
  propertySlug: "runs-at",
  definition: "the Claude Code session events that run a hook",
  values: [
    "PreToolUse",
    "PostToolUse",
    "UserPromptSubmit",
    "Stop",
    "StopFailure",
    "Notification",
    "PermissionRequest",
    "SessionStart",
    "SessionEnd",
    "SubagentStart",
    "SubagentStop",
    "PreCompact",
    "PostCompact",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook states its harness events.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook is registered at the events the hook states here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness event is written as the harness writes the harness event.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-29T15:02:17.083Z",
  updatedAt: "2026-09-25T18:02:34.000Z",
} as const satisfies SelectProperty
