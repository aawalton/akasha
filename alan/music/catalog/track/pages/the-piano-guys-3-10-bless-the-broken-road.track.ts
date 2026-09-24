import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310BlessTheBrokenRoad = {
  id: "01a0afa2-0b9c-761a-adf6-6c1002a59cc6",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-bless-the-broken-road",
  ownLength: 3.924166666666667,
  ownProgress: 3.924166666666667,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-bless-the-broken-road",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Bless the Broken Road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Jon Schmidt" }],
  trackKey: "blessthebrokenroad|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5|235450",
  song: "song/the-piano-guys-bless-the-broken-road",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 11,
      externalId: "7wnYESYaoBgROglhywVA13",
      externalLink: "https://open.spotify.com/track/7wnYESYaoBgROglhywVA13",
    },
    {
      release: "release/the-piano-guys-3-bless-the-broken-road",
      discNumber: 1,
      position: 1,
      externalId: "2kR0npzjabSWl3eGy0cSk0",
      externalLink: "https://open.spotify.com/track/2kR0npzjabSWl3eGy0cSk0",
    },
  ],
} as const satisfies Track
