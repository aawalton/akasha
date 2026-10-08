import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOhBrother = {
  id: "01a0b72f-3c20-71a6-9e56-e11e6abb2472",
  type: "page-type/song",
  slug: "james-taylor-oh-brother",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "988d7a6c-3fa6-4cac-a205-a3fccdf8ad8a",
      externalLink: "https://musicbrainz.org/work/988d7a6c-3fa6-4cac-a205-a3fccdf8ad8a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oh Brother",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  createdAt: "2026-09-19T01:02:01.248Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
