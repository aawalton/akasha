import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const viteSupabaseRrDefine = {
  id: "01a06810-9300-70cd-9ac4-fbb93bb48efa",
  pageTypeSlug: "cluster-check",
  slug: "vite-supabase-rr-define",
  definition:
    "the check refusing a vite config reaching the Supabase React Router package without its define",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "package" }],
} as const satisfies ClusterCheck
