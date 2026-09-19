import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLongLive = {
  id: "019ea416-188f-7c6a-b237-d24d07752d5a",
  type: "page-type/song",
  slug: "taylor-swift-long-live",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0730d63b-e621-43de-9cdf-d6906db2f7b7",
      externalLink: "https://musicbrainz.org/work/0730d63b-e621-43de-9cdf-d6906db2f7b7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Long Live",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
