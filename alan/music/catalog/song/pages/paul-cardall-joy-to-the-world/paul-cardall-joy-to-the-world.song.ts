import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallJoyToTheWorld = {
  id: "01a0b717-546a-752a-97d3-028ea33eef8e",
  type: "page-type/song",
  slug: "paul-cardall-joy-to-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8531b357-339e-3cc7-9ed2-0d6b928ed12e",
      externalLink: "https://musicbrainz.org/work/8531b357-339e-3cc7-9ed2-0d6b928ed12e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Joy to the World",
  artist: "artist/paul-cardall",
  songType: "derivative",
  performed: true,
} as const satisfies Song
