import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSmokeAndMirrors = {
  id: "019ea49c-7016-7751-b29e-bbc784306243",
  type: "page-type/song",
  slug: "imagine-dragons-smoke-and-mirrors",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "85168510-9a14-49c1-8097-c3d36142d2b6",
      externalLink: "https://musicbrainz.org/work/85168510-9a14-49c1-8097-c3d36142d2b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Smoke and Mirrors",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
