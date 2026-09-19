import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheCruelWorld = {
  id: "01a0b726-9056-7983-a542-ce7e55784f56",
  type: "page-type/song",
  slug: "alexandria-the-cruel-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b1c5a8cc-096d-4514-9af5-caff50ad8cd4",
      externalLink: "https://musicbrainz.org/recording/b1c5a8cc-096d-4514-9af5-caff50ad8cd4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Cruel World",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
