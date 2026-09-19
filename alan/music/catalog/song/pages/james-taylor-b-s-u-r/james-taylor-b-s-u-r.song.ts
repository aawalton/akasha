import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBSUR = {
  id: "01a0b72f-2c62-73c0-b714-78cc44f87140",
  type: "page-type/song",
  slug: "james-taylor-b-s-u-r",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b611a4f6-9bf2-4060-9c9f-9f649c509ee6",
      externalLink: "https://musicbrainz.org/work/b611a4f6-9bf2-4060-9c9f-9f649c509ee6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "B.S.U.R.",
  artist: "artist/james-taylor",
  performed: true,
  written: "solo",
} as const satisfies Song
