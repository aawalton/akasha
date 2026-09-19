import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyTwinkleTwinkle = {
  id: "01a0b725-ae60-7af9-bca2-439912096079",
  type: "page-type/song",
  slug: "sylvia-daley-twinkle-twinkle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "72e4d732-70e3-4d94-a53b-8d0d8b4f5a17",
      externalLink: "https://musicbrainz.org/work/72e4d732-70e3-4d94-a53b-8d0d8b4f5a17",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Twinkle Twinkle",
  artist: "artist/sylvia-daley",
  performed: true,
  written: "collab",
} as const satisfies Song
