import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

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

export type RunsAt = List<HarnessEvent>

export const runsAt = {
  id: "01a04e0a-f8fb-7beb-b0b8-ac268528b27e",
  pageTypeSlug: "text-property",
  slug: "runs-at",
  propertySlug: "runs-at",
  definition: "the harness events at which a hook is called",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook states its harness events.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is registered at the events it states here.",
    },
    {
      invariantKind: "departure",
      statement: "A harness event is written as the harness writes it.",
    },
  ],
} as const satisfies TextProperty
