import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioWhatAreYouAfraidOf = {
  id: "019ea4f9-18eb-700f-875a-063522c51e76",
  type: "page-type/song",
  slug: "jessica-baio-what-are-you-afraid-of",
  title: "what are you afraid of?",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5796f97a-fe59-4030-b3b8-53e846b9af29",
      externalLink: "https://musicbrainz.org/recording/5796f97a-fe59-4030-b3b8-53e846b9af29",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
