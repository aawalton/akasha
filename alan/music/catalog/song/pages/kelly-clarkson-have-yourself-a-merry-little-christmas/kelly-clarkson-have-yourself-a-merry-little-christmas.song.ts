import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHaveYourselfAMerryLittleChristmas = {
  id: "019ea4ad-6376-7559-8d2d-15ab69788c1a",
  type: "page-type/song",
  slug: "kelly-clarkson-have-yourself-a-merry-little-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ff51d26-cc88-443e-83b9-baf9cf244112",
      externalLink: "https://musicbrainz.org/work/2ff51d26-cc88-443e-83b9-baf9cf244112",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Have Yourself a Merry Little Christmas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
