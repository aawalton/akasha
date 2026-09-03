import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const emailWatch = {
  id: "01a06596-a92e-7000-b678-5d6232425a71",
  pageTypeSlug: "workspace-package",
  slug: "email-watch",
  definition: "what becomes of a message that arrives in Alan's inbox",
  manifest: "json",
  partSlugs: [
    "module/email-rule-deciding",
    "module/email-rule-reading",
    "module/email-rule-set",
    "module/inbox-run",
    "module/inbox-watching",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is acted on once.",
    },
    {
      invariantKind: "departure",
      statement: "What a run owes the next run is kept outside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "Every action taken on a message is appended to a log.",
    },
    {
      invariantKind: "gap",
      statement: "The rules a run reads are reached from akasha.",
    },
  ],
} as const satisfies WorkspacePackage
