import type { Person } from "../person.page-type.ts"

export const lizzy = {
  id: "01a053fe-00f2-7cf3-92bc-694ea856500c",
  pageTypeSlug: "person",
  slug: "lizzy",
  definition: "Lizzy Walton, Alan's eldest child",
  answeredBy: "claude",
  phone: "+13854562072",
} as const satisfies Person
