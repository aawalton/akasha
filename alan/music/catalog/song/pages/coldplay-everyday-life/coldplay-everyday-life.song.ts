import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEverydayLife = {
  id: "01a0ba5d-468e-7657-ad91-d63dff11aacf",
  type: "page-type/song",
  slug: "coldplay-everyday-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c4cd1ace-8a58-4d99-8ad2-94f43ae2cbf2",
      externalLink: "https://musicbrainz.org/work/c4cd1ace-8a58-4d99-8ad2-94f43ae2cbf2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everyday Life",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
