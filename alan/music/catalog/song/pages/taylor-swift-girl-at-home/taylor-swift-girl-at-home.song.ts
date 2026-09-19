import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftGirlAtHome = {
  id: "019ea416-201f-7959-aba4-b3aeec01e56e",
  type: "page-type/song",
  slug: "taylor-swift-girl-at-home",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65175925-04ed-4d9b-a690-cd606195a7c1",
      externalLink: "https://musicbrainz.org/work/65175925-04ed-4d9b-a690-cd606195a7c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Girl at Home",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
