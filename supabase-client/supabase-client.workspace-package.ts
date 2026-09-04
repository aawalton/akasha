import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const supabaseClient = {
  id: "01a05c91-61cc-7d0c-bbf1-b3f2103ad9d0",
  pageTypeSlug: "workspace-package",
  slug: "supabase-client",
  definition: "the Supabase client a person acts through rather than a server",
  manifest: "json",
  partSlugs: ["module/user-client"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No key stands here.",
    },
    {
      invariantKind: "departure",
      statement: "What is made here reaches only what the signed-in person may reach.",
    },
  ],
} as const satisfies WorkspacePackage
