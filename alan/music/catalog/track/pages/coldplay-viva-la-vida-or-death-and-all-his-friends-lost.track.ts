import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsLost = {
  id: "01a0b9ee-e2bc-7738-b545-b8fdb33b9788",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-lost",
  ownLength: 3.9368833333333333,
  ownProgress: 3.9368833333333333,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lost!",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "lost|4gzpq5DPGxSnKTe4SA8HAU|236213",
  song: "song/coldplay-lost",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 3,
      externalId: "1STAWoWHYJh2UVUx41pYMD",
      externalLink: "https://open.spotify.com/track/1STAWoWHYJh2UVUx41pYMD",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 3,
      externalId: "4YSmynoaeBvITzp3N8iXYU",
      externalLink: "https://open.spotify.com/track/4YSmynoaeBvITzp3N8iXYU",
    },
  ],
} as const satisfies Track
