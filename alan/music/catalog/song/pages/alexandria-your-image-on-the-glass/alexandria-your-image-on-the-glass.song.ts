import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaYourImageOnTheGlass = {
  id: "01a0b726-9135-7015-8bc9-60d49536f530",
  type: "page-type/song",
  slug: "alexandria-your-image-on-the-glass",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c549e941-9169-41cf-a4b4-243232e723f4",
      externalLink: "https://musicbrainz.org/recording/c549e941-9169-41cf-a4b4-243232e723f4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Image on the Glass",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
