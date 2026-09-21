import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysTheCelloSong = {
  id: "01a0afa2-19ff-7fd1-9d14-886f69cf97a7",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-the-cello-song",
  ownLength: 3.27845,
  ownProgress: 3.27845,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5uEcslrmFzkDqTaFB26yj2",
      externalLink: "https://open.spotify.com/track/5uEcslrmFzkDqTaFB26yj2",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Cello Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thecellosong|0jW6R8CVyVohuUJVcuweDI|196707",
  song: "song/the-piano-guys-the-cello-song",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 11,
      externalId: "5uEcslrmFzkDqTaFB26yj2",
      externalLink: "https://open.spotify.com/track/5uEcslrmFzkDqTaFB26yj2",
    },
  ],
} as const satisfies Track
