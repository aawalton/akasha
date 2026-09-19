import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonMyHeartWillGoOn = {
  id: "019ea4a0-0eb9-716c-88a7-cecc663ecf98",
  type: "page-type/song",
  slug: "zara-larsson-my-heart-will-go-on",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "78fc1f10-cbbf-3603-8c07-99a3d4f81397",
      externalLink: "https://musicbrainz.org/work/78fc1f10-cbbf-3603-8c07-99a3d4f81397",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Heart Will Go On",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
