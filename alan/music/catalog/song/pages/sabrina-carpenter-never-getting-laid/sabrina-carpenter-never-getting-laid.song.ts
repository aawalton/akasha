import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterNeverGettingLaid = {
  id: "01a0b723-c6c2-7643-8e8e-4fb2b9f8313e",
  type: "page-type/song",
  slug: "sabrina-carpenter-never-getting-laid",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6961abe8-26b0-4320-879a-e569c6a92437",
      externalLink: "https://musicbrainz.org/work/6961abe8-26b0-4320-879a-e569c6a92437",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Getting Laid",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
