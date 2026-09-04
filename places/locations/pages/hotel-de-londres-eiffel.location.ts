import type { Location } from "../location.page-type.ts"

export const hotelDeLondresEiffel = {
  id: "019f1b49-5447-759e-b235-ffd25bd9d78c",
  pageTypeSlug: "location",
  slug: "hotel-de-londres-eiffel",
  title: "Hôtel de Londres Eiffel",
  latitude: 48.8576325,
  longitude: 2.3030825,
  sourcePlaceId: "gmaps:0x143305dd7f14e796",
  sourceUrl:
    "https://www.google.com/maps/place/H%C3%B4tel+de+Londres+Eiffel/data=!4m2!3m1!1s0x47e66fdf90f1c3d9:0x143305dd7f14e796",
  locationSource: "saved:Paris, France",
} as const satisfies Location
