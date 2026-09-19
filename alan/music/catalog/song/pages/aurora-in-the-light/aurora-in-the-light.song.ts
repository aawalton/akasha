import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraInTheLight = {
  id: "019ea4a6-1aba-73f5-8f3c-4c5a41bdc4db",
  type: "page-type/song",
  slug: "aurora-in-the-light",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8adf346e-4a17-4059-92aa-8b5053758801",
      externalLink: "https://musicbrainz.org/work/8adf346e-4a17-4059-92aa-8b5053758801",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In the Light",
  artist: "artist/aurora",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
