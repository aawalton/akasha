import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSpy = {
  id: "01a0b72f-460a-7c2e-93d7-470596873f68",
  type: "page-type/song",
  slug: "james-taylor-spy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "003f2c77-4d86-4505-9a19-d955f17a51f3",
      externalLink: "https://musicbrainz.org/work/003f2c77-4d86-4505-9a19-d955f17a51f3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Spy",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
} as const satisfies Song
