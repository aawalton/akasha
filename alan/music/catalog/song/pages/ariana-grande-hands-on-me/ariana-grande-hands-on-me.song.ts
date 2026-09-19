import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHandsOnMe = {
  id: "019ea4e1-5300-745f-8f15-c2f20186e49e",
  type: "page-type/song",
  slug: "ariana-grande-hands-on-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "53c58e94-9a5a-4b0c-8dc5-216b58aec474",
      externalLink: "https://musicbrainz.org/work/53c58e94-9a5a-4b0c-8dc5-216b58aec474",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hands on Me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
