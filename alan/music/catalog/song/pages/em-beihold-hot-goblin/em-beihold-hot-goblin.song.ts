import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdHotGoblin = {
  id: "019ea4df-3e67-72f6-90ec-6e2e59a98387",
  type: "page-type/song",
  slug: "em-beihold-hot-goblin",
  title: "Hot Goblin",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9932fc9a-6198-45b2-ba43-de870d1b49c0",
      externalLink: "https://musicbrainz.org/work/9932fc9a-6198-45b2-ba43-de870d1b49c0",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
