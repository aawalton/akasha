import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const verdict = {
  id: "01a05c87-a15f-79e8-9268-c8bf1735c3e6",
  pageTypeSlug: "workspace-package",
  slug: "verdict",
  definition: "a judgement on something measured, with what it covered and what it found",
  manifest: "json",
  partSlugs: ["module/verdict-shape", "module/verdict-exit", "module/verdict-text"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A failing judgement carries at least one finding.",
    },
    {
      invariantKind: "departure",
      statement: "A judgement states the moment it was observed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here measures anything.",
    },
  ],
} as const satisfies WorkspacePackage
