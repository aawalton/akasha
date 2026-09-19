import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWalkingInTheAir = {
  id: "01a0b720-0bc6-7910-867b-1c2a44fd044f",
  type: "page-type/song",
  slug: "celtic-woman-walking-in-the-air",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "513f77fb-904c-3f2b-b17b-a91c3e7ea57c",
      externalLink: "https://musicbrainz.org/work/513f77fb-904c-3f2b-b17b-a91c3e7ea57c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Walking in the Air",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
