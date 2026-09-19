import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterNeedlessToSay = {
  id: "01a0b723-d02f-71eb-af4b-4d167083eb9e",
  type: "page-type/song",
  slug: "sabrina-carpenter-needless-to-say",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fa00275b-9ef4-464e-ab9d-9a442f2887e4",
      externalLink: "https://musicbrainz.org/work/fa00275b-9ef4-464e-ab9d-9a442f2887e4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Needless to Say",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
