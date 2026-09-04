import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Manifest } from "./properties/manifest.named-file-property.ts"

export type WorkspacePackage = Domain & {
  manifest: Manifest
}

export const workspacePackage = {
  id: "01a05891-1ea4-7c85-947f-8f033081b276",
  pageTypeSlug: "page-type",
  slug: "workspace-package",
  definition: "a domain the workspace installs as one",
  pluralSlug: "workspace-packages",
  partSlugs: ["named-file-property/manifest"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "manifest", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package manifest holds only the dependencies its package manager installs.",
    },

    {
      invariantKind: "departure",
      statement: "A workspace package holds its manifest at the root of its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest names every way into the package.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside the package reaches the package only where the manifest names.",
    },
    {
      invariantKind: "departure",
      statement: "A module the manifest does not name is reached only from inside the package.",
    },
    {
      invariantKind: "departure",
      statement: "A way in naming a module's code is spelled as that module's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A file inside the package reaches its siblings directly.",
    },
    {
      invariantKind: "departure",
      statement: "A domain becomes a workspace package by stating a manifest.",
    },
    {
      invariantKind: "gap",
      statement: "The workspace installs every package the tree holds.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Earn The Manifest",
      act: "Make a folder a workspace package only when a tool must read what it needs.",
      warrant: "A manifest costs upkeep on every change and buys nothing until something reads it.",
      aids: [
        "Importing it by name is not a tool reading it.",
        "A boundary is a check's job, not a manifest's.",
      ],
    },
  ],
} as const satisfies PageType
