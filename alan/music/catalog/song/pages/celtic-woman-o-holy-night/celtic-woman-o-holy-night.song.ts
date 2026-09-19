import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOHolyNight = {
  id: "01a0b720-0ae1-7aeb-b96b-b5c00f6ae8fe",
  type: "page-type/song",
  slug: "celtic-woman-o-holy-night",
  partOfCollections: ["artist/paul-cardall"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "368a7dea-3e18-4d46-86f9-3c31c5cb55a1",
      externalLink: "https://musicbrainz.org/work/368a7dea-3e18-4d46-86f9-3c31c5cb55a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Holy Night",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
