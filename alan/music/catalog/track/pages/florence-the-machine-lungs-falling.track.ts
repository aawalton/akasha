import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineLungsFalling = {
  id: "01a14a1f-5936-7556-8ffd-049d36f630e8",
  type: "page-type/track",
  slug: "florence-the-machine-lungs-falling",
  ownLength: 3.5848833333333334,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-lungs"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Falling",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/florence-the-machine" }],
  trackKey: "falling|1moxjboGR7GNWYIMWsRjgG|215093",
  song: "song/florence-the-machine-falling",
  carriedBy: [
    {
      release: "release/florence-the-machine-lungs",
      discNumber: 2,
      position: 4,
      externalId: "1kzR6WiyF7aCtbjUsQZ4ID",
      externalLink: "https://open.spotify.com/track/1kzR6WiyF7aCtbjUsQZ4ID",
    },
  ],
  createdAt: "2026-10-17T13:48:50.850Z",
  updatedAt: "2026-10-17T13:48:50.850Z",
} as const satisfies Track
