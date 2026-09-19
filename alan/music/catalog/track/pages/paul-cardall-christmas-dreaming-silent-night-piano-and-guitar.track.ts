import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasDreamingSilentNightPianoAndGuitar = {
  id: "01a0b4c8-6870-71ab-8940-7d9e80408f3b",
  type: "page-type/track",
  slug: "paul-cardall-christmas-dreaming-silent-night-piano-and-guitar",
  ownLength: 4.4264,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-dreaming"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "44wneGYLtJgJK1wTw4QAMS",
      externalLink: "https://open.spotify.com/track/44wneGYLtJgJK1wTw4QAMS",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Silent Night - Piano and Guitar",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2pzgrbowKM8SGmdK3YMcGq", artistName: "Mak Grgic" },
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
  ],
  trackKey: "silentnightpianoandguitar|2pzgrbowKM8SGmdK3YMcGq,7FQRbf8gbKw8KZQZAJWxH2|265584",
  song: "song/paul-cardall-silent-night-piano-and-guitar",
} as const satisfies Track
