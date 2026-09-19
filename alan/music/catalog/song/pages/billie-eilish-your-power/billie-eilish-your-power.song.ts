import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishYourPower = {
  id: "019ea4a8-495e-7f2d-be55-653445380f3b",
  type: "page-type/song",
  slug: "billie-eilish-your-power",
  rank: "A-",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "03a75386-2a79-40dd-aaf0-3304d12f7fe1",
      externalLink: "https://musicbrainz.org/work/03a75386-2a79-40dd-aaf0-3304d12f7fe1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Power",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "B-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
