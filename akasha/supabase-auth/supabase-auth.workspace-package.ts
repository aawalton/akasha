import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const supabaseAuth = {
  id: "01a05c6d-3507-7082-9e71-8c024f532b00",
  pageTypeSlug: "workspace-package",
  slug: "supabase-auth",
  definition: "signing in to Supabase, and who the signed-in user is",
  manifest: "json",
  partSlugs: [
    "module/auth",
    "module/claims",
    "module/protected-user",
    "module/supabase-user",
    "module/user-id",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No key stands here.",
    },
    {
      invariantKind: "absence",
      statement: "No token stands here.",
    },
    {
      invariantKind: "absence",
      statement: "No password stands here.",
    },
    {
      invariantKind: "departure",
      statement: "Every call takes the Supabase client its caller made.",
    },
    {
      invariantKind: "departure",
      statement: "The claims module is reached only from inside this package.",
    },
  ],
} as const satisfies WorkspacePackage
