import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveWithOrWithoutYouLive = {
  id: "01a0afa2-1377-7e7b-b26a-2454a13d7ed7",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-with-or-without-you-live",
  ownLength: 4.890666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0yMOZ4IFKnhjnNO7ZkbFkr",
      externalLink: "https://open.spotify.com/track/0yMOZ4IFKnhjnNO7ZkbFkr",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "With or Without You (Live)",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "withorwithoutyoulive|0jW6R8CVyVohuUJVcuweDI|293440",
  song: "song/the-piano-guys-with-or-without-you",
} as const satisfies Track
