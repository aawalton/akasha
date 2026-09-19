import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheWholeOfTheMoon = {
  id: "01a0b720-087d-78ea-b650-780da78542fc",
  type: "page-type/song",
  slug: "celtic-woman-the-whole-of-the-moon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1aea678b-40c9-41fa-8686-a9b444191b4f",
      externalLink: "https://musicbrainz.org/work/1aea678b-40c9-41fa-8686-a9b444191b4f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Whole of the Moon",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
