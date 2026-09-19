import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiGoodbyeMyDanishSweetheart = {
  id: "019f0ea0-d46d-7725-859a-b8714a078950",
  type: "page-type/song",
  slug: "mitski-goodbye-my-danish-sweetheart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b40b41a-b9c4-4ada-97bf-8967047f2b02",
      externalLink: "https://musicbrainz.org/work/5b40b41a-b9c4-4ada-97bf-8967047f2b02",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Goodbye, My Danish Sweetheart",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
