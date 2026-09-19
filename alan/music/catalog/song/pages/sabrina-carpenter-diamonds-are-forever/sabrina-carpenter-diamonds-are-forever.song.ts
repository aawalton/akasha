import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDiamondsAreForever = {
  id: "01a0b723-c689-7ac8-8d7e-22acc7a3e3cc",
  type: "page-type/song",
  slug: "sabrina-carpenter-diamonds-are-forever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "64233433-e7fe-431c-bc02-3f0e69d73072",
      externalLink: "https://musicbrainz.org/work/64233433-e7fe-431c-bc02-3f0e69d73072",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Diamonds Are Forever",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
