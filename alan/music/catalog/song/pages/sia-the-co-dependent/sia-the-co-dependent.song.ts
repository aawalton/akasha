import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheCoDependent = {
  id: "019ea4cc-f24b-7d7b-a1cb-11d2ca570fe8",
  type: "page-type/song",
  slug: "sia-the-co-dependent",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "816d761b-413b-4211-ab02-03f8d579781c",
      externalLink: "https://musicbrainz.org/work/816d761b-413b-4211-ab02-03f8d579781c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Co-Dependent",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
