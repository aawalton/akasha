import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBurnOut = {
  id: "019ea49a-d547-7b4e-b2eb-1246c3002546",
  type: "page-type/song",
  slug: "imagine-dragons-burn-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e2910c83-73c5-4b4b-bff4-03e868a51011",
      externalLink: "https://musicbrainz.org/work/e2910c83-73c5-4b4b-bff4-03e868a51011",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Burn Out",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
