import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3BlessTheBrokenRoadBlessTheBrokenRoad = {
  id: "01a0afa2-1d02-7b32-9c4c-edb8bb5c764c",
  type: "page-type/track",
  slug: "the-piano-guys-3-bless-the-broken-road-bless-the-broken-road",
  ownLength: 3.924166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-bless-the-broken-road"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2kR0npzjabSWl3eGy0cSk0",
      externalLink: "https://open.spotify.com/track/2kR0npzjabSWl3eGy0cSk0",
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
  trackKey: "blessthebrokenroad|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5|235450",
  song: "song/the-piano-guys-bless-the-broken-road",
} as const satisfies Track
