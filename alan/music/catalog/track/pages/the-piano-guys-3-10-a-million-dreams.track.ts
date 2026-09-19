import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AMillionDreams = {
  id: "01a0afa2-0ce9-7387-ba74-30d39522e663",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-a-million-dreams",
  ownLength: 4.751883333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46qfd3eMFxvrUVS9yu9g9H",
      externalLink: "https://open.spotify.com/track/46qfd3eMFxvrUVS9yu9g9H",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Million Dreams",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "amilliondreams|0jW6R8CVyVohuUJVcuweDI|285113",
  song: "song/evynne-hollens-a-million-dreams",
} as const satisfies Track
