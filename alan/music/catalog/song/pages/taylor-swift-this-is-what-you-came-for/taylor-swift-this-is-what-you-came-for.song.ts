import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThisIsWhatYouCameFor = {
  id: "019ea416-42bb-7092-b39f-980eef6735e8",
  type: "page-type/song",
  slug: "taylor-swift-this-is-what-you-came-for",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0580745a-cd39-4c40-8d97-9e991d9ab380",
      externalLink: "https://musicbrainz.org/work/0580745a-cd39-4c40-8d97-9e991d9ab380",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "This Is What You Came For",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
