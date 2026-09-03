import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperEsoPaths = {
  id: "01a06050-639d-78c1-a9ff-c6579f3deebd",
  pageTypeSlug: "workspace-package",
  slug: "temper-eso-paths",
  definition: "what a workstation carries of the game and of the game's own sources",
  manifest: "json",
  partSlugs: [
    "module/eso-paths",
    "module/eso-paths-resolve",
    "module/eso-clone-stamp",
    "module/lua-files",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path here is worked out from the environment rather than from what is written on disk.",
    },
    {
      invariantKind: "departure",
      statement: "Asking the disk settles which candidate the live directory is.",
    },
  ],
} as const satisfies WorkspacePackage
