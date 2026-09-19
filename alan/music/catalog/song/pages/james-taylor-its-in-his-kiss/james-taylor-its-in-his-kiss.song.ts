import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorItsInHisKiss = {
  id: "01a0b72f-3cdd-7704-ab4e-509b2afe8f81",
  type: "page-type/song",
  slug: "james-taylor-its-in-his-kiss",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9233401-47f5-3d0c-a22b-d7b76062157a",
      externalLink: "https://musicbrainz.org/work/a9233401-47f5-3d0c-a22b-d7b76062157a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s in His Kiss",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
