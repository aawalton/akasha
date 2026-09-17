import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedIndianaJonesAndTheArabianNights = {
  id: "01a0afa2-12cb-7594-bae8-7db3ced5e285",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-indiana-jones-and-the-arabian-nights",
  ownLength: 3.4385333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cttLo7IxWWiMHwsj9teQG",
      externalLink: "https://open.spotify.com/track/3cttLo7IxWWiMHwsj9teQG",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Indiana Jones and the Arabian Nights",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "indianajonesandthearabiannights|0jW6R8CVyVohuUJVcuweDI|206312",
} as const satisfies Track
