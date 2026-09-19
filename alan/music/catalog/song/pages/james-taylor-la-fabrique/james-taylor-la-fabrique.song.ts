import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLaFabrique = {
  id: "01a0b72f-4137-7c54-82ed-4f681053f746",
  type: "page-type/song",
  slug: "james-taylor-la-fabrique",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cb64fdfe-269a-4711-9bdc-7ce425bbe252",
      externalLink: "https://musicbrainz.org/work/cb64fdfe-269a-4711-9bdc-7ce425bbe252",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "La Fabrique",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: false,
  written: "solo",
} as const satisfies Song
