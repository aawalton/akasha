import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiIDonTLikeMyMind = {
  id: "019f0e9d-e226-7546-94a5-a820e7115a5f",
  type: "page-type/song",
  slug: "mitski-i-don-t-like-my-mind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "299f78e5-663c-4760-aeb7-94587e1b2e21",
      externalLink: "https://musicbrainz.org/work/299f78e5-663c-4760-aeb7-94587e1b2e21",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Like My Mind",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
