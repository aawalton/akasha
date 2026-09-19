import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWhoSAfraidOfLittleOldMe = {
  id: "019ea416-4ba9-78fe-8ff8-d52b1dd86cee",
  type: "page-type/song",
  slug: "taylor-swift-who-s-afraid-of-little-old-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dd1dd80b-da9b-4932-8bbf-07e25c5692a4",
      externalLink: "https://musicbrainz.org/work/dd1dd80b-da9b-4932-8bbf-07e25c5692a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Who’s Afraid of Little Old Me?",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
