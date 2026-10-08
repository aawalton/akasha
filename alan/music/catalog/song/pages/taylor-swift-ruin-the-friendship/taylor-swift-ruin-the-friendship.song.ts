import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRuinTheFriendship = {
  id: "019ea416-34ed-712f-a34c-0d28b8a29929",
  type: "page-type/song",
  slug: "taylor-swift-ruin-the-friendship",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5ae23dd0-6af2-4d6c-b356-f9ec3a6a6509",
      externalLink: "https://musicbrainz.org/work/5ae23dd0-6af2-4d6c-b356-f9ec3a6a6509",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ruin the Friendship",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:19.309Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
