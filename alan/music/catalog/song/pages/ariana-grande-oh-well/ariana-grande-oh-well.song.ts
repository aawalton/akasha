import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOhWell = {
  id: "01a0b76f-f0b8-7328-ae1d-5644aea46558",
  type: "page-type/song",
  slug: "ariana-grande-oh-well",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0215bac2-25dc-4296-89d8-2f8d36070aea",
      externalLink: "https://musicbrainz.org/work/0215bac2-25dc-4296-89d8-2f8d36070aea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "oh well",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
