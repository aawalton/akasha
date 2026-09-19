import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaUnderTheMilkyWay = {
  id: "01a0ba9e-3ac0-74c0-b0a3-700eccaf1e0f",
  type: "page-type/song",
  slug: "sia-under-the-milky-way",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d3434e5e-3ef3-37e9-b0b1-38355472dee9",
      externalLink: "https://musicbrainz.org/work/d3434e5e-3ef3-37e9-b0b1-38355472dee9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Under the Milky Way",
  artist: "artist/sia",
  performed: true,
} as const satisfies Song
