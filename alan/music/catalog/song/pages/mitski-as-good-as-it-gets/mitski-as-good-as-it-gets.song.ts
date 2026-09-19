import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiAsGoodAsItGets = {
  id: "019f0ea8-a82f-7cae-8291-1d1ea1cf04d5",
  type: "page-type/song",
  slug: "mitski-as-good-as-it-gets",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f94c791a-5f6b-4a81-8a0f-970a318d2f3f",
      externalLink: "https://musicbrainz.org/work/f94c791a-5f6b-4a81-8a0f-970a318d2f3f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "As Good as It Gets",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
