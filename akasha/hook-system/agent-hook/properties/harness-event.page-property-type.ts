import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

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

export const harnessEvent = {
  id: "01a04e0a-f8fc-7326-96e8-58f65a8824a4",
  pageTypeSlug: "page-property-type",
  slug: "harness-event",
  definition: "a moment at which the harness calls a hook",
  extendsSlug: null,
  kind: "text",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A harness event is written as the harness writes it.",
    },
  ],
} as const satisfies PagePropertyType
