import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperCommunityAddons = {
  id: "01a06069-b78d-7c82-89e1-869e95dd5dc4",
  pageTypeSlug: "workspace-package",
  slug: "temper-community-addons",
  definition: "addons other people wrote, fetched from ESOUI and kept current",
  manifest: "json",
  partSlugs: [
    "module/addon-update-plan",
    "module/esoui-catalog",
    "module/installed-addons",
    "module/addon-download",
    "module/install-named-addon",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "ESOUI answers what addons there are and where each download sits.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the deploy owns is never replaced by an upstream archive.",
    },
    {
      invariantKind: "departure",
      statement: "A download is proved against the checksum ESOUI states before use.",
    },
    {
      invariantKind: "departure",
      statement: "An installed addon states its version in the manifest the game reads.",
    },
  ],
} as const satisfies WorkspacePackage
