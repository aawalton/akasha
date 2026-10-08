import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraScarsOfTheEarth = {
  id: "019ea4a6-ad63-74ea-ac9d-3b5353e59bd3",
  type: "page-type/song",
  slug: "aurora-scars-of-the-earth",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aea25c27-90b2-4b53-9113-486e3ac9837b",
      externalLink: "https://musicbrainz.org/work/aea25c27-90b2-4b53-9113-486e3ac9837b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Scars of the Earth",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-06-08T00:34:07.331Z",
  updatedAt: "2026-09-19T16:57:09.000Z",
} as const satisfies Song
