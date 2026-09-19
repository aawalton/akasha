import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHarkTheHeraldAngelsSing = {
  id: "01a0b717-54d7-7bf7-87ac-b662e8b861f4",
  type: "page-type/song",
  slug: "paul-cardall-hark-the-herald-angels-sing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bc0cdd41-eaa3-3330-b972-8e8174b9e64d",
      externalLink: "https://musicbrainz.org/work/bc0cdd41-eaa3-3330-b972-8e8174b9e64d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hark! The Herald Angels Sing",
  artist: "artist/paul-cardall",
  songType: "derivative",
  performed: true,
} as const satisfies Song
