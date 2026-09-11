import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export type HarnessEvent =
  | "PreToolUse"
  | "PostToolUse"
  | "UserPromptSubmit"
  | "Stop"
  | "StopFailure"
  | "Notification"
  | "PermissionRequest"
  | "SessionStart"
  | "SessionEnd"
  | "SubagentStart"
  | "SubagentStop"
  | "PreCompact"
  | "PostCompact"

export const runsAt = {
  id: "01a04e0a-f8fb-7beb-b0b8-ac268528b27e",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "runs-at",
  propertySlug: "runs-at",
  definition: "the harness events at which a hook is called",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook states its harness events.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is registered at the events the hook states here.",
    },
    {
      invariantKind: "departure",
      statement: "A harness event is written as the harness writes the harness event.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
