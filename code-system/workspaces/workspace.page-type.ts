import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Lockfile } from "./properties/lockfile.named-file-property.ts"
import type { WorkspaceManifest } from "./properties/workspace-manifest.named-file-property.ts"

export type Workspace = Domain & {
  workspaceManifest: WorkspaceManifest
  lockfile: Lockfile
}

export const workspace = {
  id: "01a06cbb-60a1-7163-bbdd-7ba51e6b3ed6",
  pageTypeSlug: "page-type",
  slug: "workspace",
  definition: "the tree a package manager installs every package in at once",
  pluralSlug: "workspaces",
  partSlugs: ["named-file-property/lockfile", "named-file-property/workspace-manifest"],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "workspace-manifest", required: true, many: false },
    { pagePropertySlug: "lockfile", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workspace holds its manifest at the root of its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace holds its lockfile beside that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace manifest is no package's manifest.",
    },
    {
      invariantKind: "departure",
      statement: "What a workspace manifest names is reached from anywhere in the tree.",
    },
    {
      invariantKind: "departure",
      statement: "The package manager rather than an author writes the lockfile.",
    },
    {
      invariantKind: "departure",
      statement: "One lockfile answers for every package the workspace installs.",
    },
  ],
} as const satisfies PageType
