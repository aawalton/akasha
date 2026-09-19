import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHighwayDonTCare = {
  id: "019ea416-2af2-7a21-8fd9-60be70bc7752",
  type: "page-type/song",
  slug: "taylor-swift-highway-don-t-care",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "df41656b-4e5e-4893-aba9-699b7fc91848",
      externalLink: "https://musicbrainz.org/work/df41656b-4e5e-4893-aba9-699b7fc91848",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Highway Don’t Care",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
