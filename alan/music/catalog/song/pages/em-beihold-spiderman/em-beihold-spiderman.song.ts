import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdSpiderman = {
  id: "019ea4df-10eb-7e94-a868-cadcc4da063e",
  type: "page-type/song",
  slug: "em-beihold-spiderman",
  title: "Spiderman",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "205c1a94-789f-4e76-a253-dc0a9fd3e184",
      externalLink: "https://musicbrainz.org/work/205c1a94-789f-4e76-a253-dc0a9fd3e184",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
