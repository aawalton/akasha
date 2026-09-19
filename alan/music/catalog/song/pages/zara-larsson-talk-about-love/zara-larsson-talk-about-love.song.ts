import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonTalkAboutLove = {
  id: "019ea49f-3c86-7813-ad68-80f84e329e89",
  type: "page-type/song",
  slug: "zara-larsson-talk-about-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4dc5b1b6-986c-4f8f-b869-6dd67b924e88",
      externalLink: "https://musicbrainz.org/work/4dc5b1b6-986c-4f8f-b869-6dd67b924e88",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk About Love",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
