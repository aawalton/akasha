import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsYes = {
  id: "01a0b9ee-e32a-7fce-8921-fe341512a653",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-yes",
  ownLength: 7.110883333333334,
  ownProgress: 7.110883333333334,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Yes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "yes|4gzpq5DPGxSnKTe4SA8HAU|426653",
  song: "song/coldplay-yes",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 6,
      externalId: "04zfFfRMXegKi4mMkGMeze",
      externalLink: "https://open.spotify.com/track/04zfFfRMXegKi4mMkGMeze",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 6,
      externalId: "5kidFrzCBTmWlzKssBbaLb",
      externalLink: "https://open.spotify.com/track/5kidFrzCBTmWlzKssBbaLb",
    },
  ],
} as const satisfies Track
