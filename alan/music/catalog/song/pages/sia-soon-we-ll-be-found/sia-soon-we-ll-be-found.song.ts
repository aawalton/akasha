import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSoonWeLlBeFound = {
  id: "019ea4cc-6740-794c-9017-7394929d65e3",
  type: "page-type/song",
  slug: "sia-soon-we-ll-be-found",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "61b7c2be-3708-4ac9-a744-124f9d89fa56",
      externalLink: "https://musicbrainz.org/work/61b7c2be-3708-4ac9-a744-124f9d89fa56",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soon We’ll Be Found",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
