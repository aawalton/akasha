import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonStillInMyBlood = {
  id: "019ea49e-aced-7fff-ab52-fcf41bfc56d6",
  type: "page-type/song",
  slug: "zara-larsson-still-in-my-blood",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b58ba82-a797-41c4-8c96-be0290de681d",
      externalLink: "https://musicbrainz.org/work/2b58ba82-a797-41c4-8c96-be0290de681d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Still in My Blood",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
