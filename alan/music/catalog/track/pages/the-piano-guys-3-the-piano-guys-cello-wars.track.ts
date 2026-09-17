import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysCelloWars = {
  id: "01a0afa2-194f-7156-b895-d752feb09a32",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-cello-wars",
  ownLength: 3.53255,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5D6L6znBkFeIixyoOpWmH6",
      externalLink: "https://open.spotify.com/track/5D6L6znBkFeIixyoOpWmH6",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Cello Wars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "cellowars|0jW6R8CVyVohuUJVcuweDI|211953",
} as const satisfies Track
