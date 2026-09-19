import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishChihiro = {
  id: "019ea4a8-ef1e-7c9b-ae51-58a02451b9c2",
  type: "page-type/song",
  slug: "billie-eilish-chihiro",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "37e62215-5eee-4fbd-996d-711be8517782",
      externalLink: "https://musicbrainz.org/work/37e62215-5eee-4fbd-996d-711be8517782",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "CHIHIRO",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
