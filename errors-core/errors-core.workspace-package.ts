import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const errorsCore = {
  id: "01a05c48-deeb-7013-b082-9b135a70f3cc",
  pageTypeSlug: "workspace-package",
  slug: "errors-core",
  definition: "a caught error reduced to what can be reported, compared and exited on",
  manifest: "json",
  partSlugs: [
    "page-type/error",
    "module/error-report",
    "module/exit-code",
    "module/error-fingerprint",
    "module/stack-normalizing",
    "module/throwable-normalizing",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a network or a disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether an error is worth reporting.",
    },
  ],
} as const satisfies WorkspacePackage
