import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const pizzaPastry = {
  id: "019f1aec-0f2e-733b-856f-51efd39ba774",
  type: "page-type/location",
  slug: "pizza-pastry",
  title: "Pizza Pastry",
  address: "Pasticceria Boccione, Via del Portico d'Ottavia, 1, 00186 Roma RM, Italy",
  latitude: 41.8932248,
  longitude: 12.4768899,
  sourcePlaceId:
    "takeout:pizza-pastry:pasticceria-boccione-via-del-portico-d-ottavia-1-00186-roma-rm-italy",
  locationSource: "labeled",
  createdAt: "2026-06-30T23:45:05.838Z",
  updatedAt: "2026-09-15T17:21:46.000Z",
} as const satisfies Location
