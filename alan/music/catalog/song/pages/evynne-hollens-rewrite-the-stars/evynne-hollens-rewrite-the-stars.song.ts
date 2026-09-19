import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensRewriteTheStars = {
  id: "019ea4cf-5bc8-775c-9c54-b753b1ee9041",
  type: "page-type/song",
  slug: "evynne-hollens-rewrite-the-stars",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "97603584-61b4-4bf2-a1aa-9aba1f136c66",
      externalLink: "https://musicbrainz.org/work/97603584-61b4-4bf2-a1aa-9aba1f136c66",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rewrite the Stars",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
