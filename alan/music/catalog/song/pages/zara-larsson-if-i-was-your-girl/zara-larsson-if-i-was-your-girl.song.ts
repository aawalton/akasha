import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonIfIWasYourGirl = {
  id: "019ea49e-3836-7ef0-a689-2780007e8d03",
  type: "page-type/song",
  slug: "zara-larsson-if-i-was-your-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "164d9ebb-943e-4da2-9d5f-36d7276c4b05",
      externalLink: "https://musicbrainz.org/work/164d9ebb-943e-4da2-9d5f-36d7276c4b05",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If I Was Your Girl",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
