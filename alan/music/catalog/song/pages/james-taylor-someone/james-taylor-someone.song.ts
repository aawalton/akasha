import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSomeone = {
  id: "01a0b72f-4b96-7bc9-a467-1d45273b3039",
  type: "page-type/song",
  slug: "james-taylor-someone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50525d84-6d06-4ecf-8554-499b2af4fcfd",
      externalLink: "https://musicbrainz.org/work/50525d84-6d06-4ecf-8554-499b2af4fcfd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Someone",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
