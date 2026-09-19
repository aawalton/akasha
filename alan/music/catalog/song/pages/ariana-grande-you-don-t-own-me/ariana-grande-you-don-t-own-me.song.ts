import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeYouDonTOwnMe = {
  id: "019ea4e4-6722-7fc5-84df-dc0fe60e7305",
  type: "page-type/song",
  slug: "ariana-grande-you-don-t-own-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "296474ba-ba4b-3879-bdff-1636752d37e2",
      externalLink: "https://musicbrainz.org/work/296474ba-ba4b-3879-bdff-1636752d37e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Don’t Own Me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
