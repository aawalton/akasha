import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishNoTimeToDie = {
  id: "019ea4ab-47c2-7a34-b29c-430ecbb7541b",
  type: "page-type/song",
  slug: "billie-eilish-no-time-to-die",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ce59432d-3dcd-4a21-bdf3-92e3d6bb7b94",
      externalLink: "https://musicbrainz.org/work/ce59432d-3dcd-4a21-bdf3-92e3d6bb7b94",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No Time to Die",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
