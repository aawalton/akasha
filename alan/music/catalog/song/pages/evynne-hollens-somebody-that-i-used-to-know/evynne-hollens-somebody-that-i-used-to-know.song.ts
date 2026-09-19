import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensSomebodyThatIUsedToKnow = {
  id: "019ea4cf-4bae-7aac-8083-5d74b1297e0f",
  type: "page-type/song",
  slug: "evynne-hollens-somebody-that-i-used-to-know",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "94d345d3-cf6c-4e25-a080-8f000a4e5433",
      externalLink: "https://musicbrainz.org/work/94d345d3-cf6c-4e25-a080-8f000a4e5433",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Somebody That I Used to Know",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
