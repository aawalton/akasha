import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsItSOk = {
  id: "019ea49a-a5d0-707d-a76f-c502e05c5e54",
  type: "page-type/song",
  slug: "imagine-dragons-it-s-ok",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "da408d6d-4338-4b03-9cbd-f5d281f66584",
      externalLink: "https://musicbrainz.org/work/da408d6d-4338-4b03-9cbd-f5d281f66584",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Ok",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
