import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishMyBoy = {
  id: "019ea4ab-61b7-71ac-a255-4f55550d5787",
  type: "page-type/song",
  slug: "billie-eilish-my-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d750625e-d2d3-4c60-92f6-c5ae9b1e1b10",
      externalLink: "https://musicbrainz.org/work/d750625e-d2d3-4c60-92f6-c5ae9b1e1b10",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "my boy",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
