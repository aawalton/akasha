import type { Location } from "../location.page-type.ts"

export const hotelCataloniaPasseigDeGracia = {
  id: "019f1aec-0e65-7358-a90e-5b872517c3c8",
  pageTypeSlug: "location",
  slug: "hotel-catalonia-passeig-de-gracia",
  title: "Hotel Catalonia Passeig de Gràcia",
  latitude: 41.3981762,
  longitude: 2.1581098,
  notes: "Stayed here",
  sourcePlaceId: "gmaps:0xb9ffe060aa1c5bee",
  sourceUrl:
    "https://www.google.com/maps/place/Hotel+Catalonia+Passeig+de+Gr%C3%A0cia/data=!4m2!3m1!1s0x12a4a2f1f7ec32fd:0xb9ffe060aa1c5bee",
  locationSource: "saved:Barcelona, Spain",
} as const satisfies Location
