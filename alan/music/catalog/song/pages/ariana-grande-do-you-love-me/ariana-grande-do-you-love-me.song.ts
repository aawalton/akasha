import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDoYouLoveMe = {
  id: "019ea4e0-ad51-7fe6-9075-a546f0e35f94",
  type: "page-type/song",
  slug: "ariana-grande-do-you-love-me",
  title: "Do You Love Me",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2035da4e-ed02-3811-b134-7674fbcb92d7",
      externalLink: "https://musicbrainz.org/work/2035da4e-ed02-3811-b134-7674fbcb92d7",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
