import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDancingThroughLife = {
  id: "019ea4e2-5555-7aca-b303-8ba8238df1b9",
  type: "page-type/song",
  slug: "ariana-grande-dancing-through-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8f3e23a3-37f2-4a34-beb3-b59871811f93",
      externalLink: "https://musicbrainz.org/work/8f3e23a3-37f2-4a34-beb3-b59871811f93",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dancing Through Life",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
