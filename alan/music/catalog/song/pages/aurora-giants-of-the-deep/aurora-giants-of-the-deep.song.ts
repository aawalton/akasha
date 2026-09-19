import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraGiantsOfTheDeep = {
  id: "019ea4a6-8a4a-754c-b005-981abdac237e",
  type: "page-type/song",
  slug: "aurora-giants-of-the-deep",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "adaac1ba-1e26-47cf-b5c2-b96f28d5de72",
      externalLink: "https://musicbrainz.org/work/adaac1ba-1e26-47cf-b5c2-b96f28d5de72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Giants of the Deep",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
