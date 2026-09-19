import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaFightOfADragon = {
  id: "01a0b726-8e1f-7295-b02d-564e295b3cb8",
  type: "page-type/song",
  slug: "alexandria-fight-of-a-dragon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d134363a-a4cb-430d-b95c-0fdf3993d385",
      externalLink: "https://musicbrainz.org/recording/d134363a-a4cb-430d-b95c-0fdf3993d385",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fight of a Dragon",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
