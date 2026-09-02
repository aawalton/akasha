import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const errorsClient = {
  id: "01a05c89-6033-7676-ba14-f9bfd36ca899",
  pageTypeSlug: "workspace-package",
  slug: "errors-client",
  definition: "an error caught in a browser sent to the site that served it",
  manifest: "json",
  partSlugs: [
    "module/error-reporting",
    "module/global-error-capture",
    "module/error-capture-installer",
    "module/use-report-render-error",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here acts where there is no window.",
    },
  ],
} as const satisfies WorkspacePackage
