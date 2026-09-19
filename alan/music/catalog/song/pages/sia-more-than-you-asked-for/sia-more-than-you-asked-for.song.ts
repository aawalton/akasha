import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMoreThanYouAskedFor = {
  id: "019ea4c6-7b7d-7a1d-a58c-e3aed4cdb241",
  type: "page-type/song",
  slug: "sia-more-than-you-asked-for",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "00ccda45-aa3c-47ff-8f68-971b969b7da1",
      externalLink: "https://musicbrainz.org/work/00ccda45-aa3c-47ff-8f68-971b969b7da1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "More Than You Asked For",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
