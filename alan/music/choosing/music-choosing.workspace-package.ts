import type { WorkspacePackage } from "../../../code-system/workspace-packages/workspace-package.page-type.ts"

export const musicChoosing = {
  id: "01a06281-4d9d-7000-8324-01f8e3c762a1",
  pageTypeSlug: "workspace-package",
  slug: "music-choosing",
  definition: "the choice of what Alan hears next",
  manifest: "json",
  partSlugs: [
    "module/rating-ladder",
    "module/music-exploration",
    "module/track-candidate",
    "module/track-resolving",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Spotify is reached only through `@akasha/spotify`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commands the player.",
    },
  ],
} as const satisfies WorkspacePackage
