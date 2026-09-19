import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyMyOwnRules = {
  id: "01a0b725-ae25-7da7-8528-8e6d858eb57e",
  type: "page-type/song",
  slug: "sylvia-daley-my-own-rules",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "69ae65ab-ddb9-4f5d-a969-7e465a6c74a2",
      externalLink: "https://musicbrainz.org/work/69ae65ab-ddb9-4f5d-a969-7e465a6c74a2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Own Rules",
  artist: "artist/sylvia-daley",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
