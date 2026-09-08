import type { WorkspacePackage } from "../../../../code-system/workspace-packages/workspace-package.page-type.ts"

export const workflowLanguage = {
  id: "01a06f10-7000-7000-b000-9d4a2f6c0000",
  pageTypeSlug: "workspace-package",
  slug: "workflow-language",
  definition: "the words a workflow template's declaration is written in",
  manifest: "json",
  partSlugs: [
    "module/workflow-types",
    "module/ci-identifiers",
    "module/inputs-hash",
    "module/retry-transient-ddl",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A declaration names a step template rather than writing the shell lines itself.",
    },
    {
      invariantKind: "departure",
      statement: "A template answers with a step rather than running anything.",
    },
    {
      invariantKind: "departure",
      statement: "An image a step runs is named here rather than written into the step.",
    },
  ],
} as const satisfies WorkspacePackage
