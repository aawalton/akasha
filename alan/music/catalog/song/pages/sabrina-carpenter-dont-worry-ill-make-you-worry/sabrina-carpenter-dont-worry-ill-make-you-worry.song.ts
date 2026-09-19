import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDontWorryIllMakeYouWorry = {
  id: "01a0b723-c4ba-7d6d-bd96-2774fe4bc3eb",
  type: "page-type/song",
  slug: "sabrina-carpenter-dont-worry-ill-make-you-worry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4e68750a-f52f-458d-9763-b7f9e0a69694",
      externalLink: "https://musicbrainz.org/work/4e68750a-f52f-458d-9763-b7f9e0a69694",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Worry I’ll Make You Worry",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
