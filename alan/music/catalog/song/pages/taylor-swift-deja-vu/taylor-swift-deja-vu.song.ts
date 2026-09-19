import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDejaVu = {
  id: "019ea416-0df8-7fff-9bab-7a9f00f10697",
  type: "page-type/song",
  slug: "taylor-swift-deja-vu",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9364b685-ec38-4744-83f5-514f5a01d532",
      externalLink: "https://musicbrainz.org/work/9364b685-ec38-4744-83f5-514f5a01d532",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "deja vu",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
} as const satisfies Song
