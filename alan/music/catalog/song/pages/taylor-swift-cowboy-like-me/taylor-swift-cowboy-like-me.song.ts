import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCowboyLikeMe = {
  id: "019ea416-07b2-7ea6-a732-8640cdf82cb5",
  type: "page-type/song",
  slug: "taylor-swift-cowboy-like-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4533b239-8893-42c9-8d01-70eea8d298c6",
      externalLink: "https://musicbrainz.org/work/4533b239-8893-42c9-8d01-70eea8d298c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "cowboy like me",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
