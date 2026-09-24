import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsDeathAndAllHisFriends = {
  id: "01a0b9ee-e3bf-73eb-bf08-f8552a078930",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-death-and-all-his-friends",
  ownLength: 6.314216666666667,
  ownProgress: 6.314216666666667,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Death and All His Friends",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "deathandallhisfriends|4gzpq5DPGxSnKTe4SA8HAU|378853",
  song: "song/coldplay-death-and-all-his-friends",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 10,
      externalId: "0guzngk1qWk5sgdYbThEGI",
      externalLink: "https://open.spotify.com/track/0guzngk1qWk5sgdYbThEGI",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 10,
      externalId: "6BwzZV2z4CS6n85sqmk0BU",
      externalLink: "https://open.spotify.com/track/6BwzZV2z4CS6n85sqmk0BU",
    },
  ],
} as const satisfies Track
