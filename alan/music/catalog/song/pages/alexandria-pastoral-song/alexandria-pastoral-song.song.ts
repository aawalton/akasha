import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaPastoralSong = {
  id: "01a0b726-8fc3-76cc-bf28-a48d2142c057",
  type: "page-type/song",
  slug: "alexandria-pastoral-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "72cce510-826b-43a7-89fb-0e5c49da9dc4",
      externalLink: "https://musicbrainz.org/recording/72cce510-826b-43a7-89fb-0e5c49da9dc4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pastoral Song",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
