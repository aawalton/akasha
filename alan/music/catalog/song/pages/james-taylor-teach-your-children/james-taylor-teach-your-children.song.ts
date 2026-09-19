import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTeachYourChildren = {
  id: "01a0b72f-5824-718e-8455-57b47cddcb6f",
  type: "page-type/song",
  slug: "james-taylor-teach-your-children",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ea98da58-df7c-3bbf-8b73-9240ec3272c7",
      externalLink: "https://musicbrainz.org/work/ea98da58-df7c-3bbf-8b73-9240ec3272c7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Teach Your Children",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
