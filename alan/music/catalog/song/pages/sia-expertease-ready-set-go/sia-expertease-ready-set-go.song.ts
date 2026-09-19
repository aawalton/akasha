import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaExperteaseReadySetGo = {
  id: "019ea4c2-98b1-72b0-9d41-07a17d06cf4c",
  type: "page-type/song",
  slug: "sia-expertease-ready-set-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "05a21c01-7d0e-4bb5-8386-1e3b63fbfe4a",
      externalLink: "https://musicbrainz.org/work/05a21c01-7d0e-4bb5-8386-1e3b63fbfe4a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Expertease (Ready Set Go)",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
