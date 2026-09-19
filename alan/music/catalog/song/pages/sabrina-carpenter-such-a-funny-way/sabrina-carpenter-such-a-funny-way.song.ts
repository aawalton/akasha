import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSuchAFunnyWay = {
  id: "01a0b723-d324-78e0-838a-0af0ade2b8cc",
  type: "page-type/song",
  slug: "sabrina-carpenter-such-a-funny-way",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ed2033a-a42a-4d10-bef4-fde6ecf59115",
      externalLink: "https://musicbrainz.org/work/3ed2033a-a42a-4d10-bef4-fde6ecf59115",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Such a Funny Way",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
