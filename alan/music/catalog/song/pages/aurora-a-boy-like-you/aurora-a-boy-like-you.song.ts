import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraABoyLikeYou = {
  id: "019ea4a4-3b87-7746-8792-47c912261240",
  type: "page-type/song",
  slug: "aurora-a-boy-like-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "383effe2-76ee-454d-ae03-e6e73467fa7b",
      externalLink: "https://musicbrainz.org/work/383effe2-76ee-454d-ae03-e6e73467fa7b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A BOY LIKE YOU",
  artist: "artist/aurora",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
