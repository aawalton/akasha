import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYoureOnlyLonely = {
  id: "01a0b72f-4b54-759b-922a-454aceea2eb8",
  type: "page-type/song",
  slug: "james-taylor-youre-only-lonely",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a8a6698-c178-3b2c-8312-29c9e027b362",
      externalLink: "https://musicbrainz.org/work/4a8a6698-c178-3b2c-8312-29c9e027b362",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re Only Lonely",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
