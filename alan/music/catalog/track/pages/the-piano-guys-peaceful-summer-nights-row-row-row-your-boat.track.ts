import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsRowRowRowYourBoat = {
  id: "01a0afa1-c5f8-7391-9d00-c61953355267",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-row-row-row-your-boat",
  ownLength: 1.6733333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5hH6pFhbMUlkCOxIlZmcyP",
      externalLink: "https://open.spotify.com/track/5hH6pFhbMUlkCOxIlZmcyP",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Row Row Row Your Boat",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rowrowrowyourboat|0jW6R8CVyVohuUJVcuweDI|100400",
  song: "song/the-piano-guys-row-row-row-your-boat",
} as const satisfies Track
