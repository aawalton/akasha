import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const smsAccess = {
  id: "01a05b73-2ec6-753d-93f8-fc22c4035cad",
  pageTypeSlug: "workspace-package",
  slug: "sms-access",
  definition: "what an inbound SMS reads and writes in the page store",
  manifest: "json",
  partSlugs: ["module/client", "module/sms-allowlist", "module/sms-discard"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the SMS carrier.",
    },
    {
      invariantKind: "stopgap",
      statement: "The Supabase client handed in is read by nothing.",
    },
  ],
} as const satisfies WorkspacePackage
