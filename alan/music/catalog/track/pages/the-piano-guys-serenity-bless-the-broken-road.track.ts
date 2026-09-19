import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityBlessTheBrokenRoad = {
  id: "01a0afa2-0916-7852-9ffc-71594503c404",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-bless-the-broken-road",
  ownLength: 3.924,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ihys8VEEtMJ5L12E82GHq",
      externalLink: "https://open.spotify.com/track/1Ihys8VEEtMJ5L12E82GHq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bless the Broken Road",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "2YQ4MY2VwOMv43C0GemUY5", artistName: "Jon Schmidt" },
  ],
  trackKey: "blessthebrokenroad|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5|235440",
  song: "song/the-piano-guys-bless-the-broken-road",
} as const satisfies Track
