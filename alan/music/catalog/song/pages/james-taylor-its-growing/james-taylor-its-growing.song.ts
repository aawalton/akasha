import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorItsGrowing = {
  id: "01a0b72f-3638-7203-9bfe-3ccd130cab4e",
  type: "page-type/song",
  slug: "james-taylor-its-growing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4ca0c494-5aca-34cb-a1b6-a2802d2dc110",
      externalLink: "https://musicbrainz.org/work/4ca0c494-5aca-34cb-a1b6-a2802d2dc110",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Growing",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:01:59.736Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
