import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftItSNiceToHaveAFriend = {
  id: "019ea416-1c7b-72b5-9739-8be285be8385",
  type: "page-type/song",
  slug: "taylor-swift-it-s-nice-to-have-a-friend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "31ee3821-e3ea-4c3d-afc1-dc7484345cb0",
      externalLink: "https://musicbrainz.org/work/31ee3821-e3ea-4c3d-afc1-dc7484345cb0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Nice to Have a Friend",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
