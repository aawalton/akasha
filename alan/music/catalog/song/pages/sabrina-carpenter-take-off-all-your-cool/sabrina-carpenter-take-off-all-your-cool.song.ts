import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTakeOffAllYourCool = {
  id: "01a0b723-d2bb-797b-b2a2-8fa1b8a7e8fb",
  type: "page-type/song",
  slug: "sabrina-carpenter-take-off-all-your-cool",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ba8f26d-0bdc-4117-8629-c73e16940442",
      externalLink: "https://musicbrainz.org/work/3ba8f26d-0bdc-4117-8629-c73e16940442",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Take Off All Your Cool",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
