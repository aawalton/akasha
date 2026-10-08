import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHeyStephen = {
  id: "019ea416-223b-7053-b583-1bc4afcb6b45",
  type: "page-type/song",
  slug: "taylor-swift-hey-stephen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7d7c1db7-b29f-34fd-be71-37f18021307c",
      externalLink: "https://musicbrainz.org/work/7d7c1db7-b29f-34fd-be71-37f18021307c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hey Stephen",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:14.523Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
