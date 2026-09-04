import type { Location } from "../location.page-type.ts"

export const bonaVitaBistro = {
  id: "019f1aec-0fd9-7137-9642-ad01f1045535",
  pageTypeSlug: "location",
  slug: "bona-vita-bistro",
  title: "Bona Vita Bistro",
  address: "1820 W Traverse Pkwy Ste C, Lehi, UT 84043, United States",
  latitude: 40.4343056,
  longitude: -111.8794274,
  reviewDate: "2022-09-08",
  reviewRating: 4,
  reviewText:
    "I had a mixed experience, but could tell the staff were trying. I forget how nasty capers are, so that’s my bad, but I didn’t enjoy the bread appetizer either. Thankfully the Chicken Parmesan was really good!\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0xc7219ef6c8082068",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xc7219ef6c8082068",
  locationSource: "review",
  visited: true,
} as const satisfies Location
