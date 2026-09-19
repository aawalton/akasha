import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioIDonTEvenThinkAboutYou = {
  id: "019ea4f7-caea-7461-8cde-e6e16181acdf",
  type: "page-type/song",
  slug: "jessica-baio-i-don-t-even-think-about-you",
  title: "I Don't Even Think About You",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "625f91ca-554b-429d-be4d-8509e02bc077",
      externalLink: "https://musicbrainz.org/recording/625f91ca-554b-429d-be4d-8509e02bc077",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
