import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftHighwayDonTCare = {
  id: "019ea416-2af2-7a21-8fd9-60be70bc7752",
  type: "song",
  slug: "taylor-swift-highway-don-t-care",
  title: "Highway Don’t Care",
  artist: "taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "df41656b-4e5e-4893-aba9-699b7fc91848",
      externalLink: "https://musicbrainz.org/work/df41656b-4e5e-4893-aba9-699b7fc91848",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
