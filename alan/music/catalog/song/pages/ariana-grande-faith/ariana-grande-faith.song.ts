import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeFaith = {
  id: "019ea4e2-5e08-7b3c-8f2e-d4e4a2ca35b0",
  type: "page-type/song",
  slug: "ariana-grande-faith",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "900751bc-d0a6-4806-b769-ca4128d3c063",
      externalLink: "https://musicbrainz.org/work/900751bc-d0a6-4806-b769-ca4128d3c063",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Faith",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
