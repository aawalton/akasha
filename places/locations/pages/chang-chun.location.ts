import type { Location } from "../location.page-type.ts"

export const changChun = {
  id: "019f1aec-1045-70ee-bb7c-665119966edd",
  pageTypeSlug: "location",
  slug: "chang-chun",
  title: "Chang Chun",
  address: "51 S Main St, Salt Lake City, UT 84144, United States",
  latitude: 40.7686921,
  longitude: -111.888792,
  reviewDate: "2017-08-03",
  reviewRating: 4,
  reviewText:
    "My sister and I love the chow mein, and orange chicken. So good! The teriyaki chicken was also really good.\nWe've eaten here twice now and it was great both times. I don't know why there so many bad reviews for this place? If there was a location closer to me I'd eat here more often. For an $8 plate you get fried rice or chow mein or white rice and two entrées, which is enough for my sister and I to split and both have a decent lunch. We'll definitely be coming back!",
  sourcePlaceId: "gmaps:0x66ed7a58972f1493",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x66ed7a58972f1493",
  locationSource: "review",
  visited: true,
} as const satisfies Location
