import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoIWillAlwaysLoveYou = {
  id: "01a0afa1-cb62-73af-8e93-1ead8817171c",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-i-will-always-love-you",
  ownLength: 3.140833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "248RjKrIDRnJaCVORLB4j8",
      externalLink: "https://open.spotify.com/track/248RjKrIDRnJaCVORLB4j8",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Will Always Love You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "iwillalwaysloveyou|0jW6R8CVyVohuUJVcuweDI|188450",
  song: "song/the-piano-guys-i-will-always-love-you",
} as const satisfies Track
