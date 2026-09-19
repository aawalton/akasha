import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishOceanEyesTheRemixesOceanEyesGoldhouseRemix = {
  id: "01a0b638-ee32-75cc-b96d-51e289f4ac66",
  type: "page-type/track",
  slug: "billie-eilish-ocean-eyes-the-remixes-ocean-eyes-goldhouse-remix",
  ownLength: 3.56,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-ocean-eyes-the-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1JbuC7uZm0P1PyX7N7gDEM",
      externalLink: "https://open.spotify.com/track/1JbuC7uZm0P1PyX7N7gDEM",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ocean Eyes - GOLDHOUSE Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "670UISOh9XV1zlq5z5IfoY", artistName: "GOLDHOUSE" },
  ],
  trackKey: "oceaneyesgoldhouseremix|670UISOh9XV1zlq5z5IfoY,6qqNVTkY8uBg9cP3Jd7DAH|213600",
  song: "song/billie-eilish-ocean-eyes",
} as const satisfies Track
