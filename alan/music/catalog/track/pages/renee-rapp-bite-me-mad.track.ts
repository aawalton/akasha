import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeMad = {
  id: "01a0caa8-fd8f-734c-9b07-8708b8d6fbd8",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-mad",
  ownLength: 2.91615,
  ownProgress: 0,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Mad",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "mad|2hUYKu1x0UZQXvzCmggvSn|174969",
  song: "song/renee-rapp-mad",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 2,
      externalId: "4NONTWamwnOVRi0qk6B8hf",
      externalLink: "https://open.spotify.com/track/4NONTWamwnOVRi0qk6B8hf",
    },
  ],
} as const satisfies Track
