import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdShinyNewThings = {
  id: "019ea4de-f411-73db-926c-aa66772cd863",
  type: "page-type/song",
  slug: "em-beihold-shiny-new-things",
  title: "Shiny New Things",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c76db44-e6a1-4b70-8392-d34f593acc45",
      externalLink: "https://musicbrainz.org/work/0c76db44-e6a1-4b70-8392-d34f593acc45",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
