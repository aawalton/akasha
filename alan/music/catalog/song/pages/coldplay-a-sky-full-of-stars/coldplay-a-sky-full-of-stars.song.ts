import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayASkyFullOfStars = {
  id: "01a0ba5d-4a3c-7437-9e17-7963dbfdb464",
  type: "page-type/song",
  slug: "coldplay-a-sky-full-of-stars",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f42ca644-0fa7-4ec5-9089-542c9a1b8be3",
      externalLink: "https://musicbrainz.org/work/f42ca644-0fa7-4ec5-9089-542c9a1b8be3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Sky Full of Stars",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
