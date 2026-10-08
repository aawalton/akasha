import type { Playlist } from "akasha/alan/music/choosing/playlist/playlist.page-type.types.ts"

export const unheard = {
  id: "01a0c511-9f4d-732d-876b-2ab22d89cade",
  type: "page-type/playlist",
  slug: "unheard",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2L6oEjIg7HpfRzv2FrfZcG",
      externalLink: "https://open.spotify.com/playlist/2L6oEjIg7HpfRzv2FrfZcG",
    },
  ],
  createdAt: "2026-09-21T17:44:21.581Z",
  updatedAt: "2026-09-21T17:44:31.000Z",
} as const satisfies Playlist
