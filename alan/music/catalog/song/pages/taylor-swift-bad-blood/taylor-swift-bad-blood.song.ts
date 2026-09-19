import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBadBlood = {
  id: "019ea416-1405-7467-bcef-3a7c3a063767",
  type: "page-type/song",
  slug: "taylor-swift-bad-blood",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c23570a3-467c-4ee8-80ff-0a04b339e844",
      externalLink: "https://musicbrainz.org/work/c23570a3-467c-4ee8-80ff-0a04b339e844",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Blood",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
