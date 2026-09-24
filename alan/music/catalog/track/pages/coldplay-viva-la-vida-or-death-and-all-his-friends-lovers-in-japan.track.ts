import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsLoversInJapan = {
  id: "01a0b9ee-e305-700c-a890-8dd533f28924",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-lovers-in-japan",
  ownLength: 6.850216666666666,
  ownProgress: 6.850216666666666,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lovers in Japan",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "loversinjapan|4gzpq5DPGxSnKTe4SA8HAU|411013",
  song: "song/coldplay-lovers-in-japan",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 5,
      externalId: "5qPGi9p8VqcizfdgWxtmLt",
      externalLink: "https://open.spotify.com/track/5qPGi9p8VqcizfdgWxtmLt",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 5,
      externalId: "0Hwwbk98kXcwyvtgkdqlMD",
      externalLink: "https://open.spotify.com/track/0Hwwbk98kXcwyvtgkdqlMD",
    },
  ],
} as const satisfies Track
