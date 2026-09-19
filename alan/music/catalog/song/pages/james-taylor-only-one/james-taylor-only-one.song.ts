import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOnlyOne = {
  id: "01a0b72f-3b83-7a4b-b033-1fbfd6a2665c",
  type: "page-type/song",
  slug: "james-taylor-only-one",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "959677a5-c171-4378-92a6-a32a4c3c08c1",
      externalLink: "https://musicbrainz.org/work/959677a5-c171-4378-92a6-a32a4c3c08c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only One",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
