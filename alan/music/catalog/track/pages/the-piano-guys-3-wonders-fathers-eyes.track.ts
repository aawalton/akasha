import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersFathersEyes = {
  id: "01a0afa2-15fa-7941-9645-7b8335d0b4b0",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-fathers-eyes",
  ownLength: 3.9531,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "12sBT9hQ7GE9X72Nbem1ty",
      externalLink: "https://open.spotify.com/track/12sBT9hQ7GE9X72Nbem1ty",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Fathers' Eyes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "fatherseyes|0jW6R8CVyVohuUJVcuweDI|237186",
  song: "song/the-piano-guys-fathers-eyes",
} as const satisfies Track
