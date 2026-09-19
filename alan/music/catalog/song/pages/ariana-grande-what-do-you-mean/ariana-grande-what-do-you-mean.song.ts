import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWhatDoYouMean = {
  id: "019ea4e4-05f9-7fb7-b1a1-cc343ba97a30",
  type: "page-type/song",
  slug: "ariana-grande-what-do-you-mean",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a3f5c2b-750a-44ed-8f94-2d422d083d6c",
      externalLink: "https://musicbrainz.org/work/0a3f5c2b-750a-44ed-8f94-2d422d083d6c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What Do You Mean?",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
