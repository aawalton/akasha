import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeEverytime = {
  id: "019ea4e1-640e-7c19-ad50-12cedc034101",
  type: "page-type/song",
  slug: "ariana-grande-everytime",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "59ec0a26-1487-4ab1-b30e-1127c769aae4",
      externalLink: "https://musicbrainz.org/work/59ec0a26-1487-4ab1-b30e-1127c769aae4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "everytime",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
