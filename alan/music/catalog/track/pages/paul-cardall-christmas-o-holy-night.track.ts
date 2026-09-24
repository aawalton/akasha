import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasOHolyNight = {
  id: "01a0b4c8-3495-7b15-8e75-3b8da89daeaf",
  type: "page-type/track",
  slug: "paul-cardall-christmas-o-holy-night",
  ownLength: 7.13135,
  ownProgress: 7.13135,
  partOfCollections: ["release/paul-cardall-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "O Holy Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "CeCe Winans" }],
  trackKey: "oholynight|3qfrrrSO7utFdJkM2tvMRb,7FQRbf8gbKw8KZQZAJWxH2|427881",
  song: "song/celtic-woman-o-holy-night",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 8,
      externalId: "50YWeUtsdF8sc5sijyZ6Gi",
      externalLink: "https://open.spotify.com/track/50YWeUtsdF8sc5sijyZ6Gi",
    },
  ],
} as const satisfies Track
