import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOnlyAWomansHeart = {
  id: "01a0b720-0ac3-75d6-989e-9208f37c644d",
  type: "page-type/song",
  slug: "celtic-woman-only-a-womans-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35e0edcd-5e48-3462-bcae-dda0034b4795",
      externalLink: "https://musicbrainz.org/work/35e0edcd-5e48-3462-bcae-dda0034b4795",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only a Woman’s Heart",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
