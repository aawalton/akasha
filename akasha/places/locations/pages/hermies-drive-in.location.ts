import type { Location } from "../location.page-type.ts"

export const hermiesDriveIn = {
  id: "019f1aec-0d13-7462-9566-d0647bf7431f",
  pageTypeSlug: "location",
  slug: "hermies-drive-in",
  title: "Hermie's Drive In",
  latitude: 37.6824509,
  longitude: -113.061398,
  notes: "Possibly good shakes",
  sourcePlaceId: "gmaps:0xf260dada2972f544",
  sourceUrl:
    "https://www.google.com/maps/place/Hermie's+Drive+In/data=!4m2!3m1!1s0x80b561a543ca4e7d:0xf260dada2972f544",
  locationSource: "saved:Want to go",
} as const satisfies Location
