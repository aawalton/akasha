import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterReadYourMind = {
  id: "01a0b723-c9d6-7f50-a34e-79b37cd815a2",
  type: "page-type/song",
  slug: "sabrina-carpenter-read-your-mind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "91177631-d3ff-4a08-9e7b-b0a77b3dac31",
      externalLink: "https://musicbrainz.org/work/91177631-d3ff-4a08-9e7b-b0a77b3dac31",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Read your Mind",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
