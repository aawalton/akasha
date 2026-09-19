import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayPoppyfields = {
  id: "01a0ba60-fed6-70c2-ae8c-5996be210f49",
  type: "page-type/song",
  slug: "coldplay-poppyfields",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ff744f4f-c77e-4a4b-ab33-e26078492157",
      externalLink: "https://musicbrainz.org/work/ff744f4f-c77e-4a4b-ab33-e26078492157",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Poppyfields",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
