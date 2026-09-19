import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAveMaria = {
  id: "01a0b720-0e71-7722-abcb-9bc5a729f0f8",
  type: "page-type/song",
  slug: "celtic-woman-ave-maria",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "718b96fa-75eb-436e-8c30-0c647aa99696",
      externalLink: "https://musicbrainz.org/work/718b96fa-75eb-436e-8c30-0c647aa99696",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ave Maria",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
