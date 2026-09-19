import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMe = {
  id: "019ea4b2-fafb-704d-b1d0-1313f331a8f8",
  type: "page-type/song",
  slug: "ariana-grande-santa-can-t-you-hear-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "985cda6c-68f0-4e94-bcd4-ee5396cae3a1",
      externalLink: "https://musicbrainz.org/work/985cda6c-68f0-4e94-bcd4-ee5396cae3a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa, Can’t You Hear Me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
