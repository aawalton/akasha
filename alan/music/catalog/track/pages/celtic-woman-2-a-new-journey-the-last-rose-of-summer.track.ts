import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyTheLastRoseOfSummer = {
  id: "01a0abea-752d-7a7a-a040-023a3b54f4b1",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-the-last-rose-of-summer",
  ownLength: 3.6033333333333335,
  ownProgress: 3.6033333333333335,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Gy3PeLK5vXJAnTti847mF",
      externalLink: "https://open.spotify.com/track/7Gy3PeLK5vXJAnTti847mF",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Last Rose Of Summer",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thelastroseofsummer|6NWtt9pNOL2Gx7kBykdE5x|216200",
  song: "song/celtic-woman-the-last-rose-of-summer",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 9,
      externalId: "7Gy3PeLK5vXJAnTti847mF",
      externalLink: "https://open.spotify.com/track/7Gy3PeLK5vXJAnTti847mF",
    },
  ],
} as const satisfies Track
