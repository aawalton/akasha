import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSexual = {
  id: "019ea49e-0a01-758f-814b-5ded7e788121",
  type: "page-type/song",
  slug: "zara-larsson-sexual",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1128bd56-2be3-41cc-bf26-871898bb43c0",
      externalLink: "https://musicbrainz.org/work/1128bd56-2be3-41cc-bf26-871898bb43c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sexual",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
