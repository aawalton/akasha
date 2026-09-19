import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonKeepingScore = {
  id: "019ea4af-c931-77e6-b919-eabc62d7c96c",
  type: "page-type/song",
  slug: "kelly-clarkson-keeping-score",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b4452948-ccf3-4230-b56f-9a264c80520c",
      externalLink: "https://musicbrainz.org/work/b4452948-ccf3-4230-b56f-9a264c80520c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Keeping Score",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
