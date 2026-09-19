import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheGallery = {
  id: "01a0b72f-5649-7e1e-b679-61ff61186f64",
  type: "page-type/song",
  slug: "james-taylor-the-gallery",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ce79495f-5fca-3b45-8d8d-5288b992d352",
      externalLink: "https://musicbrainz.org/work/ce79495f-5fca-3b45-8d8d-5288b992d352",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Gallery",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
