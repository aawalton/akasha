import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsLifeDeath = {
  id: "01a0b4c8-3cd1-7455-8fd4-10e492829b79",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-life-death",
  ownLength: 5.5553333333333335,
  ownProgress: 5.5553333333333335,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Life & Death",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "lifedeath|7FQRbf8gbKw8KZQZAJWxH2|333320",
  song: "song/paul-cardall-life-death",
  carriedBy: [
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 2,
      externalId: "4jvuplniikE13YYb2OnztN",
      externalLink: "https://open.spotify.com/track/4jvuplniikE13YYb2OnztN",
    },
  ],
} as const satisfies Track
