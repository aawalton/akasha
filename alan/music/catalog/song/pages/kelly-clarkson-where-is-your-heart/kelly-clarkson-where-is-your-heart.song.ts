import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWhereIsYourHeart = {
  id: "019ea4c1-6961-7e79-bbf0-00980d443ee2",
  type: "page-type/song",
  slug: "kelly-clarkson-where-is-your-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c74cb12f-b969-3cdc-ac42-d3fa26713e17",
      externalLink: "https://musicbrainz.org/work/c74cb12f-b969-3cdc-ac42-d3fa26713e17",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Where Is Your Heart",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
