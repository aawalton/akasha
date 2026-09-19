import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonDonTWorryBoutMe = {
  id: "019ea4a1-64b9-7078-bf4a-e830a9341147",
  type: "page-type/song",
  slug: "zara-larsson-don-t-worry-bout-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0b15f20-62aa-4888-8103-4b64ac6b20bf",
      externalLink: "https://musicbrainz.org/work/c0b15f20-62aa-4888-8103-4b64ac6b20bf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Worry Bout Me",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
