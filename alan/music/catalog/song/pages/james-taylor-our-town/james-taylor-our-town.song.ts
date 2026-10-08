import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOurTown = {
  id: "01a0b72f-3c05-7411-9919-637e14ecc26c",
  type: "page-type/song",
  slug: "james-taylor-our-town",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "97e9867f-6dc1-3177-b027-87342da830b0",
      externalLink: "https://musicbrainz.org/work/97e9867f-6dc1-3177-b027-87342da830b0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Our Town",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:01.221Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
