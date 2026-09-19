import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIDonTWantToWantYou = {
  id: "019ea4c7-2431-7e1f-871d-cd72c308c17f",
  type: "page-type/song",
  slug: "sia-i-don-t-want-to-want-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b0800de-6bf1-4461-a5fc-c035d463a341",
      externalLink: "https://musicbrainz.org/work/2b0800de-6bf1-4461-a5fc-c035d463a341",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Want to Want You",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
