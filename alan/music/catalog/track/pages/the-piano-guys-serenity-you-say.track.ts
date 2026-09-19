import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityYouSay = {
  id: "01a0afa2-0a29-753d-97ba-ae02f8ff37ad",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-you-say",
  ownLength: 5.17555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0mkbbA9OZ9LW5WOUn7ZMaX",
      externalLink: "https://open.spotify.com/track/0mkbbA9OZ9LW5WOUn7ZMaX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You Say",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "yousay|0jW6R8CVyVohuUJVcuweDI|310533",
  song: "song/the-piano-guys-you-say",
} as const satisfies Track
