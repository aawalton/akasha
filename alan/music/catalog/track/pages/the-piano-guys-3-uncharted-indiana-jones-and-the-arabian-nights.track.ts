import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedIndianaJonesAndTheArabianNights = {
  id: "01a0afa2-12cb-7594-bae8-7db3ced5e285",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-indiana-jones-and-the-arabian-nights",
  ownLength: 3.4385333333333334,
  ownProgress: 3.4385333333333334,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Indiana Jones and the Arabian Nights",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "indianajonesandthearabiannights|0jW6R8CVyVohuUJVcuweDI|206312",
  song: "song/the-piano-guys-indiana-jones-and-the-arabian-nights",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 12,
      externalId: "3cttLo7IxWWiMHwsj9teQG",
      externalLink: "https://open.spotify.com/track/3cttLo7IxWWiMHwsj9teQG",
    },
  ],
} as const satisfies Track
