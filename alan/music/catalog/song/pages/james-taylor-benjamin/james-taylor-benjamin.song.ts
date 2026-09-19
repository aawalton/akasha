import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBenjamin = {
  id: "01a0b72f-30bb-7432-a4fb-ec14986392eb",
  type: "page-type/song",
  slug: "james-taylor-benjamin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eadd0b8a-a01d-4639-987f-7ff8d80d5f13",
      externalLink: "https://musicbrainz.org/work/eadd0b8a-a01d-4639-987f-7ff8d80d5f13",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Benjamin",
  artist: "artist/james-taylor",
  performed: true,
  written: "solo",
} as const satisfies Song
