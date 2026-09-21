import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioRadioRemixesRadioHeklerRemix = {
  id: "01a0c622-1b68-7773-8a74-e5dbedaeca4e",
  type: "page-type/track",
  slug: "jessica-baio-radio-remixes-radio-hekler-remix",
  ownLength: 3.84,
  ownProgress: 3.84,
  partOfCollections: ["release/jessica-baio-radio-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Radio - Hekler Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "77AiFEVeAVj2ORpC85QVJs", artistName: "Steve Aoki" },
    { externalId: "6Xgp2XMz1fhVYe7i6yNAax", artistName: "Trippie Redd" },
    { externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" },
    { externalId: "5QvkIWJdNyVeqs1FgVOEg7", artistName: "KABU" },
    { externalId: "4FoQJyBgyhdDCb1wdEgNZh", artistName: "Hekler" },
  ],
  trackKey:
    "radioheklerremix|0VMFTqmv0hYlWruyBERT95,4FoQJyBgyhdDCb1wdEgNZh,5QvkIWJdNyVeqs1FgVOEg7,6Xgp2XMz1fhVYe7i6yNAax,77AiFEVeAVj2ORpC85QVJs|230400",
  song: "song/jessica-baio-radio",
  carriedBy: [
    {
      release: "release/jessica-baio-radio-remixes",
      discNumber: 1,
      position: 2,
      externalId: "39Bs9vekXO5TZg8LeYe9oB",
      externalLink: "https://open.spotify.com/track/39Bs9vekXO5TZg8LeYe9oB",
    },
  ],
} as const satisfies Track
