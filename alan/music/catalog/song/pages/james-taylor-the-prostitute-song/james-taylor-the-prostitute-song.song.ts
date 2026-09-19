import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheProstituteSong = {
  id: "01a0b72f-579b-72b3-8838-b3dbcf8383fa",
  type: "page-type/song",
  slug: "james-taylor-the-prostitute-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e0daf62e-8c4b-4eaa-a5e5-5baab009d626",
      externalLink: "https://musicbrainz.org/work/e0daf62e-8c4b-4eaa-a5e5-5baab009d626",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Prostitute Song",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
