import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorJohnnieComesBack = {
  id: "01a0b72f-40c3-7c59-ae7a-69d0bb81dfac",
  type: "page-type/song",
  slug: "james-taylor-johnnie-comes-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c829fb9e-69d9-488d-aa0a-4c33f2febfbd",
      externalLink: "https://musicbrainz.org/work/c829fb9e-69d9-488d-aa0a-4c33f2febfbd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Johnnie Comes Back",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
