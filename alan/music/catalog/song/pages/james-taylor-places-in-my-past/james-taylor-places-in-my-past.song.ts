import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorPlacesInMyPast = {
  id: "01a0b72f-4482-76d6-baad-dcdfe45e9ddf",
  type: "page-type/song",
  slug: "james-taylor-places-in-my-past",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ef3da5f8-2593-42c5-b44e-1e524e4b1e1c",
      externalLink: "https://musicbrainz.org/work/ef3da5f8-2593-42c5-b44e-1e524e4b1e1c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Places in My Past",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:03.394Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
