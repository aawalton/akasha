import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishOceanEyesTheRemixesOceanEyesCautiousClayRemix = {
  id: "01a0b638-ee59-7bab-ba47-14ee6e4aa044",
  type: "page-type/track",
  slug: "billie-eilish-ocean-eyes-the-remixes-ocean-eyes-cautious-clay-remix",
  ownLength: 3.1882166666666665,
  ownProgress: 3.1882166666666665,
  partOfCollections: ["release/billie-eilish-ocean-eyes-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ocean Eyes - Cautious Clay Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "Cautious Clay" }],
  trackKey: "oceaneyescautiousclayremix|6iWuBN32BqCJAeXW6o3nil,6qqNVTkY8uBg9cP3Jd7DAH|191293",
  song: "song/billie-eilish-ocean-eyes",
  carriedBy: [
    {
      release: "release/billie-eilish-ocean-eyes-the-remixes",
      discNumber: 1,
      position: 4,
      externalId: "3bM4b4P6QFDnjdXXI2zufO",
      externalLink: "https://open.spotify.com/track/3bM4b4P6QFDnjdXXI2zufO",
    },
  ],
} as const satisfies Track
