import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonWowFeatSabrinaCarpenterRemixWowFeatSabrinaCarpenterRemix = {
  id: "01a0aa7c-3d36-7a46-913d-654fe1ff05ab",
  type: "page-type/track",
  slug: "zara-larsson-wow-feat-sabrina-carpenter-remix-wow-feat-sabrina-carpenter-remix",
  ownLength: 2.9942,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-wow-feat-sabrina-carpenter-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WokFKscrfGEGGLPTu3jgO",
      externalLink: "https://open.spotify.com/track/5WokFKscrfGEGGLPTu3jgO",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "WOW (feat. Sabrina Carpenter) - Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
  ],
  trackKey: "wowfeatsabrinacarpenterremix|1Xylc3o4UrD53lo9CvFvVg,74KM79TiuVKeVCqs8QtB0B|179652",
  song: "song/zara-larsson-wow",
} as const satisfies Track
