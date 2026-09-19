import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishYouReStoned = {
  id: "019ea4a9-16a4-78aa-8fbf-777e0ec38e5e",
  type: "page-type/song",
  slug: "billie-eilish-you-re-stoned",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "415725ca-5846-4922-be24-7219f5b71a8e",
      externalLink: "https://musicbrainz.org/work/415725ca-5846-4922-be24-7219f5b71a8e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "you’re stoned",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
