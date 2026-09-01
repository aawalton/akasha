import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const openQuestions = {
  id: "01a05c99-9da8-724a-90e0-079d2d9659c8",
  pageTypeSlug: "workspace-package",
  slug: "open-questions",
  definition: "a question waiting on Alan, and what an answer to it is written as",
  manifest: "json",
  partSlugs: [
    "module/question-status",
    "module/open-question-count",
    "module/question-answer",
    "module/question-link",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question is a page of its own type rather than a row of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers a question.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks one.",
    },
  ],
} as const satisfies WorkspacePackage
