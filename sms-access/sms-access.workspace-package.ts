import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const smsAccess = {
  id: "01a05b73-2ec6-753d-93f8-fc22c4035cad",
  pageTypeSlug: "workspace-package",
  slug: "sms-access",
  definition: "the pages an inbound SMS reads and writes",
  manifest: "json",
  partSlugs: ["module/sms-allowlist", "module/sms-discard", "page-type/sms-discard"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the SMS carrier.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Supabase.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "The pages an inbound SMS reads and writes are pages akasha carries.",
    },
  ],
} as const satisfies WorkspacePackage
