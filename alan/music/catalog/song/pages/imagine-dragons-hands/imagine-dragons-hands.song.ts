import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsHands = {
  id: "019ea499-2cc4-7f0c-9ab6-309e49405c99",
  type: "page-type/song",
  slug: "imagine-dragons-hands",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7ab4ba35-d5fa-430d-a336-483d76e12211",
      externalLink: "https://musicbrainz.org/work/7ab4ba35-d5fa-430d-a336-483d76e12211",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hands",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
