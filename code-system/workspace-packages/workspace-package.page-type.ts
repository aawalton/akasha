import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const workspacePackage = {
  id: "01a05891-1ea4-7c85-947f-8f033081b276",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "workspace-package",
  definition: "a folder with a package.json file",
  pluralSlug: "workspace-packages",
  parts: [
    "file-property/dockerfile-extensions",
    "file-property/manifest",
    "code-file-property/tunnel-routes",
    "text-property/tool-reached",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/manifest", required: true, many: false },
    { pageProperty: "code-file-property/tunnel-routes", required: false, many: false },
    { pageProperty: "file-property/dockerfile-extensions", required: false, many: false },
    { pageProperty: "text-property/tool-reached", required: false, many: true, maxCount: null },
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
  types: "ts",
} as const satisfies PageType
