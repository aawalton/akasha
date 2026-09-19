import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishNda = {
  id: "019ea4aa-b875-7160-bfc6-703216e83acf",
  type: "page-type/song",
  slug: "billie-eilish-nda",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "991938e8-cbe0-4f93-bdcb-c161cfc3d695",
      externalLink: "https://musicbrainz.org/work/991938e8-cbe0-4f93-bdcb-c161cfc3d695",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "NDA",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
