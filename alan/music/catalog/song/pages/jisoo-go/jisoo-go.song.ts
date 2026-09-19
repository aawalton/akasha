import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooGo = {
  id: "01a0b724-3886-7237-a4e3-5f8dd5d42642",
  type: "page-type/song",
  slug: "jisoo-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "766569c9-4164-429b-945b-66867198cc2d",
      externalLink: "https://musicbrainz.org/work/766569c9-4164-429b-945b-66867198cc2d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "GO",
  artist: "artist/jisoo",
  performed: false,
  written: "collab",
} as const satisfies Song
