import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftChristmasMustBeSomethingMore = {
  id: "019ea416-02d2-7acf-ba83-caf600b76856",
  type: "page-type/song",
  slug: "taylor-swift-christmas-must-be-something-more",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "079b682b-2627-4697-92d3-8ddb4b0a41ed",
      externalLink: "https://musicbrainz.org/work/079b682b-2627-4697-92d3-8ddb4b0a41ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Must Be Something More",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
