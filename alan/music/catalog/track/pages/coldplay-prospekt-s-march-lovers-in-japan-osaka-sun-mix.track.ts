import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchLoversInJapanOsakaSunMix = {
  id: "01a0b9ee-fcd5-7b6c-9a9a-a3f50fc7daf9",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-lovers-in-japan-osaka-sun-mix",
  ownLength: 3.970666666666667,
  ownProgress: 3.970666666666667,
  partOfCollections: [
    "release/coldplay-prospekt-s-march",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lovers in Japan - Osaka Sun Mix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "loversinjapanosakasunmix|4gzpq5DPGxSnKTe4SA8HAU|238240",
  song: "song/coldplay-lovers-in-japan",
  carriedBy: [
    {
      release: "release/coldplay-prospekt-s-march",
      discNumber: 1,
      position: 7,
      externalId: "5LclPF5hcVCm6hL7HQ9VaV",
      externalLink: "https://open.spotify.com/track/5LclPF5hcVCm6hL7HQ9VaV",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 2,
      position: 7,
      externalId: "1wV03IHNBW0ZkT5lBCScXb",
      externalLink: "https://open.spotify.com/track/1wV03IHNBW0ZkT5lBCScXb",
    },
  ],
} as const satisfies Track
