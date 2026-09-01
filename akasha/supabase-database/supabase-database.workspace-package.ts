import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const supabaseDatabase = {
  id: "01a05c5c-1e3d-7b7f-8110-d8d124e9b7d5",
  pageTypeSlug: "workspace-package",
  slug: "supabase-database",
  definition: "the shape of every table, view and function Alan's Supabase database holds",
  manifest: "json",
  partSlugs: [
    "module/database",
    "module/database-json",
    "module/tables",
    "module/views",
    "module/functions-0",
    "module/functions-1",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No URL and no key and no client stands here.",
    },
    {
      invariantKind: "departure",
      statement: "Every name here is emitted by Supabase.",
    },
    {
      invariantKind: "stopgap",
      statement: "Nothing in this repository regenerates these types.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A shard is split at whole entries so no file passes the length akasha holds a file to.",
    },
  ],
} as const satisfies WorkspacePackage
