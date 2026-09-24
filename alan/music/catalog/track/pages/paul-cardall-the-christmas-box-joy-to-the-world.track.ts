import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxJoyToTheWorld = {
  id: "01a0b4c8-663a-7134-90b4-0950fee993b2",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-joy-to-the-world",
  ownLength: 2.2173333333333334,
  ownProgress: 2.2173333333333334,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "Joy To The World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "joytotheworld|7FQRbf8gbKw8KZQZAJWxH2|133040",
  song: "song/celtic-woman-joy-to-the-world",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 12,
      externalId: "6ECnCJjRWAfXZrRulSo4vk",
      externalLink: "https://open.spotify.com/track/6ECnCJjRWAfXZrRulSo4vk",
    },
  ],
} as const satisfies Track
