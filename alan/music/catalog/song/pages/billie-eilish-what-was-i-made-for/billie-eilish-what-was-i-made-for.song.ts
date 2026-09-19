import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishWhatWasIMadeFor = {
  id: "019ea4a8-fc19-7e4e-83a9-51a5347e6c66",
  type: "page-type/song",
  slug: "billie-eilish-what-was-i-made-for",
  partOfCollections: ["artist/the-piano-guys"],
  rank: "S",
  tags: ["autism"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a301a39-2be9-420b-ae82-ec7869c77ce8",
      externalLink: "https://musicbrainz.org/work/3a301a39-2be9-420b-ae82-ec7869c77ce8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What Was I Made For?",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "S-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
