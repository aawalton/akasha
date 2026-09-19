import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayRockinAllOverTheWorld = {
  id: "01a0ba5d-5124-7f8e-999e-b700632a8bc2",
  type: "page-type/song",
  slug: "coldplay-rockin-all-over-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b31460f-26a9-3e90-b0a9-6adcf8d1fba9",
      externalLink: "https://musicbrainz.org/work/5b31460f-26a9-3e90-b0a9-6adcf8d1fba9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rockin’ All Over the World",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
