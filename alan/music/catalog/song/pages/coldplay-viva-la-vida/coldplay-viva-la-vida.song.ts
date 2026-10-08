import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayVivaLaVida = {
  id: "01a0ba60-fa87-715f-884d-152339400780",
  type: "page-type/song",
  slug: "coldplay-viva-la-vida",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc3874b7-447b-371d-9666-fc5bc76c41d8",
      externalLink: "https://musicbrainz.org/work/cc3874b7-447b-371d-9666-fc5bc76c41d8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Viva la Vida",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T15:55:12.903Z",
  updatedAt: "2026-09-19T16:18:26.000Z",
} as const satisfies Song
