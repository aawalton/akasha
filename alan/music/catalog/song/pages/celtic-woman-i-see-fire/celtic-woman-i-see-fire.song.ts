import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanISeeFire = {
  id: "01a0b720-14c6-71b3-b68a-f8af5484ba01",
  type: "page-type/song",
  slug: "celtic-woman-i-see-fire",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d9af8987-fc0b-43ab-8b0f-5a0fbcd8a64a",
      externalLink: "https://musicbrainz.org/work/d9af8987-fc0b-43ab-8b0f-5a0fbcd8a64a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I See Fire",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
