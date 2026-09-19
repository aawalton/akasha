import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThereSYourTrouble = {
  id: "019ea416-479e-7a92-a826-b455a71e8e0c",
  type: "page-type/song",
  slug: "taylor-swift-there-s-your-trouble",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8c657e67-af75-4f46-a505-6113a11e4623",
      externalLink: "https://musicbrainz.org/work/8c657e67-af75-4f46-a505-6113a11e4623",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "There’s Your Trouble",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
