import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMeBritney = {
  id: "019ea416-1fea-714e-b97a-4cf484bbfa10",
  type: "page-type/song",
  slug: "taylor-swift-me-britney",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "651091fc-69bb-4fdd-80f6-16d1d4dbb65a",
      externalLink: "https://musicbrainz.org/work/651091fc-69bb-4fdd-80f6-16d1d4dbb65a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Me & Britney",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
