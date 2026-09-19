import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMnaNaHeireann = {
  id: "01a0b720-0c69-7d68-806d-d08621352c3e",
  type: "page-type/song",
  slug: "celtic-woman-mna-na-heireann",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57bc411d-5246-3621-8326-c4136b8a6fe4",
      externalLink: "https://musicbrainz.org/work/57bc411d-5246-3621-8326-c4136b8a6fe4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mná na hÉireann",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
} as const satisfies Song
