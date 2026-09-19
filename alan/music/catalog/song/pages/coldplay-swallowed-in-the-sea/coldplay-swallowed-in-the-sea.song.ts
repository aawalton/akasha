import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySwallowedInTheSea = {
  id: "01a0ba60-f635-72e2-85d4-124934d6dc5b",
  type: "page-type/song",
  slug: "coldplay-swallowed-in-the-sea",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a5a815b9-d8c7-3be6-91ea-0eba7a804d88",
      externalLink: "https://musicbrainz.org/work/a5a815b9-d8c7-3be6-91ea-0eba7a804d88",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Swallowed in the Sea",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
