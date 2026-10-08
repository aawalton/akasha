import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonOhDarling = {
  id: "019ea4b2-52b7-7bef-ae51-c0fc06f4d736",
  type: "page-type/song",
  slug: "kelly-clarkson-oh-darling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "53027b47-d8b3-3749-8e73-0f5d4e5fe242",
      externalLink: "https://musicbrainz.org/work/53027b47-d8b3-3749-8e73-0f5d4e5fe242",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oh! Darling",
  artist: "artist/kelly-clarkson",
  performed: true,
  createdAt: "2026-06-08T00:46:50.551Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
