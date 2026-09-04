import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const emailInbound = {
  id: "01a05bcd-25e2-7b0c-aff6-314192c66a72",
  pageTypeSlug: "workspace-package",
  slug: "email-inbound",
  definition: "what an arriving email is read into before anything acts on it",
  manifest: "json",
  partSlugs: [
    "module/inbound-message",
    "module/sender",
    "module/agent-channel",
    "module/inbound-decision",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a mail provider.",
    },
    {
      invariantKind: "departure",
      statement: "Every judgement here is made from headers alone.",
    },
  ],
} as const satisfies WorkspacePackage
