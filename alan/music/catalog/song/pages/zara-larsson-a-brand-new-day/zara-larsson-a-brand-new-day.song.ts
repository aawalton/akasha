import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonABrandNewDay = {
  id: "019ea4a1-0bb0-73ec-a638-be5e52fc4593",
  type: "page-type/song",
  slug: "zara-larsson-a-brand-new-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b7bacded-d186-484a-abea-d9b5d85188e1",
      externalLink: "https://musicbrainz.org/work/b7bacded-d186-484a-abea-d9b5d85188e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Brand New Day",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
