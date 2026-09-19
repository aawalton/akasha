import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonCanIHaveAKiss = {
  id: "019ea4b0-bb12-707b-89ee-b1eb31d0d6fb",
  type: "page-type/song",
  slug: "kelly-clarkson-can-i-have-a-kiss",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e6dea1c7-60e7-4e16-beeb-45ef9edd7a35",
      externalLink: "https://musicbrainz.org/work/e6dea1c7-60e7-4e16-beeb-45ef9edd7a35",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Can I Have a Kiss",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
