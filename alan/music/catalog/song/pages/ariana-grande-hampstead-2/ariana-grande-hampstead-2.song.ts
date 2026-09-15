import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHampstead2 = {
  id: "019ea4e2-96e2-78ef-89aa-2fce161a6597",
  type: "song",
  slug: "ariana-grande-hampstead-2",
  title: "Hampstead",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae01cb6a-56b4-46c6-b07c-11d73664ca05",
      externalLink: "https://musicbrainz.org/work/ae01cb6a-56b4-46c6-b07c-11d73664ca05",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
