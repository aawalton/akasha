import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAPlaceInThisWorld = {
  id: "019ea416-133a-7a88-8de0-71f90ffc0e84",
  type: "page-type/song",
  slug: "taylor-swift-a-place-in-this-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba20038f-12ee-4c46-a31b-03e64358c36f",
      externalLink: "https://musicbrainz.org/work/ba20038f-12ee-4c46-a31b-03e64358c36f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Place in This World",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
