import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBetterThanRevenge = {
  id: "019ea416-08db-7778-abbe-341cd056eb74",
  type: "page-type/song",
  slug: "taylor-swift-better-than-revenge",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "54b1ac8a-8064-3415-a2e7-71b9dcc88c25",
      externalLink: "https://musicbrainz.org/work/54b1ac8a-8064-3415-a2e7-71b9dcc88c25",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Better Than Revenge",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
