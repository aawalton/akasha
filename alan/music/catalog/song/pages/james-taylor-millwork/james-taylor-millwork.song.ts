import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMillwork = {
  id: "01a0b72f-35ad-738f-bb6e-615583b25f73",
  type: "page-type/song",
  slug: "james-taylor-millwork",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a23b8b0-8454-4e34-b048-862dc0df2dc5",
      externalLink: "https://musicbrainz.org/work/3a23b8b0-8454-4e34-b048-862dc0df2dc5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Millwork",
  artist: "artist/james-taylor",
  performed: true,
  written: "solo",
} as const satisfies Song
