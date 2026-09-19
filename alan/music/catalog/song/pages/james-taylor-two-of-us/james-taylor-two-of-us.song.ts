import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTwoOfUs = {
  id: "01a0b72f-46c1-7228-9718-97ec0100dd02",
  type: "page-type/song",
  slug: "james-taylor-two-of-us",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "14614bcc-b8cc-3a03-9a76-d2b8c7a4a8f7",
      externalLink: "https://musicbrainz.org/work/14614bcc-b8cc-3a03-9a76-d2b8c7a4a8f7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Two of Us",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
