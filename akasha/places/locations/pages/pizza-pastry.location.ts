import type { Location } from "../location.page-type.ts"

export const pizzaPastry = {
  id: "019f1aec-0f2e-733b-856f-51efd39ba774",
  pageTypeSlug: "location",
  slug: "pizza-pastry",
  title: "Pizza Pastry",
  address: "Pasticceria Boccione, Via del Portico d'Ottavia, 1, 00186 Roma RM, Italy",
  latitude: 41.8932248,
  longitude: 12.4768899,
  sourcePlaceId:
    "takeout:pizza-pastry:pasticceria-boccione-via-del-portico-d-ottavia-1-00186-roma-rm-italy",
  locationSource: "labeled",
} as const satisfies Location
