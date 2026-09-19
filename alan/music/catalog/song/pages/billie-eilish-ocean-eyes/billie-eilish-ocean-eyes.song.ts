import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishOceanEyes = {
  id: "019ea4ac-08cb-71fa-b233-915224f16266",
  type: "page-type/song",
  slug: "billie-eilish-ocean-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e778f0a1-f500-4276-8fb9-918745ed6531",
      externalLink: "https://musicbrainz.org/work/e778f0a1-f500-4276-8fb9-918745ed6531",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ocean eyes",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
