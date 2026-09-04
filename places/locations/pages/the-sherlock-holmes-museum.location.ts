import type { Location } from "../location.page-type.ts"

export const theSherlockHolmesMuseum = {
  id: "019f1b49-55df-793b-a2c1-ccf057930b2a",
  pageTypeSlug: "location",
  slug: "the-sherlock-holmes-museum",
  title: "The Sherlock Holmes Museum",
  latitude: 51.5073594,
  longitude: -0.125233,
  sourcePlaceId: "gmaps:0xfcd227d9a53748f3",
  sourceUrl:
    "https://www.google.com/maps/place/The+Sherlock+Holmes+Museum/data=!4m2!3m1!1s0x48761acf335de791:0xfcd227d9a53748f3",
  locationSource: "saved:London, England",
} as const satisfies Location
