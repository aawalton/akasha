import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheLuckyOne = {
  id: "019ea416-3918-785a-bb62-5d132a77ab2b",
  type: "page-type/song",
  slug: "taylor-swift-the-lucky-one",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "96699523-dcc9-448e-885f-77770dab89c8",
      externalLink: "https://musicbrainz.org/work/96699523-dcc9-448e-885f-77770dab89c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Lucky One",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
