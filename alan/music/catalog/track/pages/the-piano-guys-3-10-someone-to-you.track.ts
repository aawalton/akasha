import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310SomeoneToYou = {
  id: "01a0afa2-0a6d-7856-a455-994d3cd50958",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-someone-to-you",
  ownLength: 3.4433333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4myZBpamPz9I9kAsLjIMOD",
      externalLink: "https://open.spotify.com/track/4myZBpamPz9I9kAsLjIMOD",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone To You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someonetoyou|0jW6R8CVyVohuUJVcuweDI|206600",
} as const satisfies Track
