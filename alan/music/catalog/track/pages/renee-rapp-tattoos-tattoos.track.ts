import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappTattoosTattoos = {
  id: "01a0caa9-118e-7c51-8a23-9104e69c59e5",
  type: "page-type/track",
  slug: "renee-rapp-tattoos-tattoos",
  ownLength: 2.883766666666667,
  ownProgress: 2.883766666666667,
  partOfCollections: ["release/renee-rapp-tattoos"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tattoos",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "tattoos|2hUYKu1x0UZQXvzCmggvSn|173026",
  song: "song/renee-rapp-tattoos",
  carriedBy: [
    {
      release: "release/renee-rapp-tattoos",
      discNumber: 1,
      position: 1,
      externalId: "4JbUI6AoGibHGsHN77aSws",
      externalLink: "https://open.spotify.com/track/4JbUI6AoGibHGsHN77aSws",
    },
  ],
} as const satisfies Track
