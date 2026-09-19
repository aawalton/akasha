import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterMakeYouFeelMyLove = {
  id: "01a0b723-c57a-773c-94f0-601e3f143e17",
  type: "page-type/song",
  slug: "sabrina-carpenter-make-you-feel-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "55a38fa3-b0b8-4c74-ab22-4022e70a67da",
      externalLink: "https://musicbrainz.org/work/55a38fa3-b0b8-4c74-ab22-4022e70a67da",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Make You Feel My Love",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
