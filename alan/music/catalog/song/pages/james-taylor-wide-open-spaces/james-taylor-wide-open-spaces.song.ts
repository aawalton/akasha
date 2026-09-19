import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWideOpenSpaces = {
  id: "01a0b72f-4b75-7a64-84bd-2fd6bf5bffec",
  type: "page-type/song",
  slug: "james-taylor-wide-open-spaces",
  partOfCollections: ["artist/kelly-clarkson"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4b0f9afd-1113-4176-8766-8e3c8bf67b53",
      externalLink: "https://musicbrainz.org/work/4b0f9afd-1113-4176-8766-8e3c8bf67b53",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wide Open Spaces",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
