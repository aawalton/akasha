import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWestCoast = {
  id: "019ea49c-2701-7fdf-921c-1054169467a7",
  type: "page-type/song",
  slug: "imagine-dragons-west-coast",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6280bfb2-ebb3-40c1-a760-dafa18cef01a",
      externalLink: "https://musicbrainz.org/work/6280bfb2-ebb3-40c1-a760-dafa18cef01a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "West Coast",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
