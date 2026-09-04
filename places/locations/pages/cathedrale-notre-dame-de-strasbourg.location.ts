import type { Location } from "../location.page-type.ts"

export const cathedraleNotreDameDeStrasbourg = {
  id: "019f1b49-5408-79dc-9585-2d09dd4ccc97",
  pageTypeSlug: "location",
  slug: "cathedrale-notre-dame-de-strasbourg",
  title: "Cathédrale Notre-Dame-de-Strasbourg",
  latitude: 48.866582,
  longitude: 2.298424,
  notes: "Recommended by David Eggertsen",
  sourcePlaceId: "gmaps:0xe7152777f55e2738",
  sourceUrl:
    "https://www.google.com/maps/place/Cath%C3%A9drale+Notre-Dame-de-Strasbourg/data=!4m2!3m1!1s0x4796c85253398843:0xe7152777f55e2738",
  locationSource: "saved:Paris, France",
} as const satisfies Location
