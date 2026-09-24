import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdDriveByLoversDriveByLovers = {
  id: "01a0d3ab-b8da-7233-99a8-24082c406ca5",
  type: "page-type/track",
  slug: "em-beihold-drive-by-lovers-drive-by-lovers",
  ownLength: 3.5183333333333335,
  ownProgress: 0,
  partOfCollections: ["release/em-beihold-drive-by-lovers"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Drive by Lovers",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "2Jb7lQunEGJej2qvtcBIiI", artistName: "Peachy King" },
    { externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" },
  ],
  trackKey: "drivebylovers|2Jb7lQunEGJej2qvtcBIiI,7o2ZQYM7nTsaVdkXY38UAA|211100",
  song: "song/em-beihold-drive-by-lovers",
  carriedBy: [
    {
      release: "release/em-beihold-drive-by-lovers",
      discNumber: 1,
      position: 1,
      externalId: "6F8u5APvEIFxDhgfy78bU0",
      externalLink: "https://open.spotify.com/track/6F8u5APvEIFxDhgfy78bU0",
    },
  ],
} as const satisfies Track
