import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const geoIo = {
  id: "01a05c48-deeb-7000-a8e9-296daa14b0c7",
  pageTypeSlug: "workspace-package",
  slug: "geo-io",
  definition: "a point on the earth, found by the name of a place and measured against another",
  manifest: "json",
  partSlugs: ["module/coord", "module/geoapify"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here holds an api key.",
    },
  ],
} as const satisfies WorkspacePackage
