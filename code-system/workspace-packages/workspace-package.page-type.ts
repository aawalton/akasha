import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { DockerfileExtensions } from "./properties/dockerfile-extensions.file-property.ts"
import type { Manifest } from "./properties/manifest.file-property.ts"
import type { ToolReached } from "./properties/tool-reached.text-property.ts"
import type { TunnelRoutes } from "./properties/tunnel-routes.file-property.ts"

export type WorkspacePackage = Domain & {
  manifest: Manifest
  tunnelRoutes?: TunnelRoutes
  dockerfileExtensions?: DockerfileExtensions
  toolReached?: ToolReached
}

export const workspacePackage = {
  id: "01a05891-1ea4-7c85-947f-8f033081b276",
  pageTypeSlug: "page-type",
  slug: "workspace-package",
  definition: "a folder with a package.json file",
  pluralSlug: "workspace-packages",
  partSlugs: [
    "file-property/dockerfile-extensions",
    "file-property/manifest",
    "file-property/tunnel-routes",
    "text-property/tool-reached",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "file-property/manifest", required: true, many: false },
    { pagePropertySlug: "file-property/tunnel-routes", required: false, many: false },
    { pagePropertySlug: "file-property/dockerfile-extensions", required: false, many: false },
    { pagePropertySlug: "text-property/tool-reached", required: false, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package manifest has only the dependencies its package manager installs.",
    },

    {
      invariantKind: "departure",
      statement: "A workspace package has its manifest at the root of its own folder.",
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
      statement: "The workspace installs every package the tree has.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Package Only When Needed",
      act: "Make a folder a package only where the folder needs to be one.",
      warrant:
        "A folder is simpler than a package, so a package earns its place only by making the whole simpler.",
      aids: [
        "The root folder needs to be a package.",
        "A folder installed separately from the root needs to be a package.",
        "No other folder needs to be a package.",
      ],
    },
  ],
} as const satisfies PageType
