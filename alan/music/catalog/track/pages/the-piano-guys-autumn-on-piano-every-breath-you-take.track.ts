import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoEveryBreathYouTake = {
  id: "01a0afa1-bf4b-70fb-9166-255347604b56",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-every-breath-you-take",
  ownLength: 4.536833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5OvCeYiBG0maA4xyyIZ2YD",
      externalLink: "https://open.spotify.com/track/5OvCeYiBG0maA4xyyIZ2YD",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Every Breath You Take",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "everybreathyoutake|0jW6R8CVyVohuUJVcuweDI|272210",
  song: "song/the-piano-guys-every-breath-you-take",
} as const satisfies Track
