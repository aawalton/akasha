import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWeAreOneOleOla = {
  id: "019ea4ca-8ad7-7af9-ad45-7c5dbdf3861a",
  type: "page-type/song",
  slug: "sia-we-are-one-ole-ola",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0419a72b-affe-41f7-b378-1c080f75342b",
      externalLink: "https://musicbrainz.org/work/0419a72b-affe-41f7-b378-1c080f75342b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We Are One (Ole Ola)",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
