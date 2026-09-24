import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsCemeteriesOfLondon = {
  id: "01a0b9ee-e298-7d09-af21-a8fa0660bdcc",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-cemeteries-of-london",
  ownLength: 3.351766666666667,
  ownProgress: 3.351766666666667,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Cemeteries of London",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "cemeteriesoflondon|4gzpq5DPGxSnKTe4SA8HAU|201106",
  song: "song/coldplay-cemeteries-of-london",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 2,
      externalId: "03uqdEuopXPSCg4MvgA2fI",
      externalLink: "https://open.spotify.com/track/03uqdEuopXPSCg4MvgA2fI",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 2,
      externalId: "6xbbxvsdy2kC16kUDssPLD",
      externalLink: "https://open.spotify.com/track/6xbbxvsdy2kC16kUDssPLD",
    },
  ],
} as const satisfies Track
