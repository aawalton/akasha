import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAmericanBoy = {
  id: "019ea416-1202-70e3-b586-e7a00857a5da",
  type: "page-type/song",
  slug: "taylor-swift-american-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "accac83f-0e23-44fa-b43c-31b6f4b8ce40",
      externalLink: "https://musicbrainz.org/work/accac83f-0e23-44fa-b43c-31b6f4b8ce40",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "American Boy",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
