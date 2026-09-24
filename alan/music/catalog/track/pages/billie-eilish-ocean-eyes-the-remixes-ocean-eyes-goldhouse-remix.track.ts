import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishOceanEyesTheRemixesOceanEyesGoldhouseRemix = {
  id: "01a0b638-ee32-75cc-b96d-51e289f4ac66",
  type: "page-type/track",
  slug: "billie-eilish-ocean-eyes-the-remixes-ocean-eyes-goldhouse-remix",
  ownLength: 3.56,
  ownProgress: 3.56,
  partOfCollections: ["release/billie-eilish-ocean-eyes-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ocean Eyes - GOLDHOUSE Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "GOLDHOUSE" }],
  trackKey: "oceaneyesgoldhouseremix|670UISOh9XV1zlq5z5IfoY,6qqNVTkY8uBg9cP3Jd7DAH|213600",
  song: "song/billie-eilish-ocean-eyes",
  carriedBy: [
    {
      release: "release/billie-eilish-ocean-eyes-the-remixes",
      discNumber: 1,
      position: 3,
      externalId: "1JbuC7uZm0P1PyX7N7gDEM",
      externalLink: "https://open.spotify.com/track/1JbuC7uZm0P1PyX7N7gDEM",
    },
  ],
} as const satisfies Track
