import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSantaBaby = {
  id: "019ea416-39ae-7fe8-9718-1904714a5cb7",
  type: "page-type/song",
  slug: "ariana-grande-santa-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a10d7ca4-2dea-3127-b84c-b15fdd24b026",
      externalLink: "https://musicbrainz.org/work/a10d7ca4-2dea-3127-b84c-b15fdd24b026",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Baby",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
