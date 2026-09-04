import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const supabaseServer = {
  id: "01a05c75-8718-772e-bcdb-e24fb342750c",
  pageTypeSlug: "workspace-package",
  slug: "supabase-server",
  definition: "the Supabase client a server holds, acting as the service role",
  manifest: "json",
  partSlugs: ["module/service-role", "module/throwaway-user"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No key stands here.",
    },
    {
      invariantKind: "departure",
      statement: "The key is read from the environment at the moment a client is made.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing made here is ever handed to a browser.",
    },
  ],
} as const satisfies WorkspacePackage
