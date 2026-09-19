import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGoodnightIrene = {
  id: "01a0b72f-2fc5-7db8-8e2a-f34c28e898e9",
  type: "page-type/song",
  slug: "james-taylor-goodnight-irene",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dd7e9416-e0ac-3eec-9377-768623fb37ae",
      externalLink: "https://musicbrainz.org/work/dd7e9416-e0ac-3eec-9377-768623fb37ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Goodnight Irene",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
