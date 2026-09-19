import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBeAlright = {
  id: "019ea4e1-96d6-7943-ba82-b6d59802ec35",
  type: "page-type/song",
  slug: "ariana-grande-be-alright",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "67d75471-1309-4572-8b51-75e94f3f8612",
      externalLink: "https://musicbrainz.org/work/67d75471-1309-4572-8b51-75e94f3f8612",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Be Alright",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
