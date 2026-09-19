import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanIsSinneMnaNaHeireann = {
  id: "01a0b720-0a90-702b-8cf2-67c6b97c728e",
  type: "page-type/song",
  slug: "celtic-woman-is-sinne-mna-na-heireann",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "31f45768-fe10-4331-97b6-4fd3c4aea914",
      externalLink: "https://musicbrainz.org/work/31f45768-fe10-4331-97b6-4fd3c4aea914",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Is Sinne Mná na hÉireann",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
