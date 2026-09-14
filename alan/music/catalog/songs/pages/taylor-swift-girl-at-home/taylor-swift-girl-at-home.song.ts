import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftGirlAtHome = {
  id: "019ea416-201f-7959-aba4-b3aeec01e56e",
  type: "song",
  slug: "taylor-swift-girl-at-home",
  title: "Girl at Home",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65175925-04ed-4d9b-a690-cd606195a7c1",
      externalLink: "https://musicbrainz.org/work/65175925-04ed-4d9b-a690-cd606195a7c1",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
