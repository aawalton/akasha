import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanJoyToTheWorld = {
  id: "01a0b720-0fc8-7a93-b429-ec437f02bf97",
  type: "page-type/song",
  slug: "celtic-woman-joy-to-the-world",
  partOfCollections: ["artist/paul-cardall"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8531b357-339e-3cc7-9ed2-0d6b928ed12e",
      externalLink: "https://musicbrainz.org/work/8531b357-339e-3cc7-9ed2-0d6b928ed12e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Joy to the World",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
