import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsVivaLaVida = {
  id: "01a0b9ee-e351-75eb-aa12-3cefdc1f5969",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-viva-la-vida",
  ownLength: 4.03955,
  ownProgress: 4.03955,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
    "release/coldplay-viva-la-vida",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Viva La Vida",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "vivalavida|4gzpq5DPGxSnKTe4SA8HAU|242373",
  song: "song/coldplay-viva-la-vida",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida",
      discNumber: 1,
      position: 1,
      externalId: "6WrUT7FOAlDscRWU7ndmyd",
      externalLink: "https://open.spotify.com/track/6WrUT7FOAlDscRWU7ndmyd",
    },
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 7,
      externalId: "1mea3bSkSGXuIRvnydlB5b",
      externalLink: "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 7,
      externalId: "3zzwBtusqxBiGRsGpsnN3F",
      externalLink: "https://open.spotify.com/track/3zzwBtusqxBiGRsGpsnN3F",
    },
  ],
} as const satisfies Track
