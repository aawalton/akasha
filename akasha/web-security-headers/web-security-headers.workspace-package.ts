import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const webSecurityHeaders = {
  id: "01a05c48-deeb-7007-9fa8-e8205045f0c1",
  pageTypeSlug: "workspace-package",
  slug: "web-security-headers",
  definition: "the response headers every page of a site is served under",
  manifest: "json",
  partSlugs: ["module/security-headers"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every site is served the same headers but for what its own policy widens.",
    },
  ],
} as const satisfies WorkspacePackage
