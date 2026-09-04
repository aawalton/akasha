import type { Person } from "../person.page-type.ts"

export const joseph = {
  id: "01a053fe-00f1-710c-a23f-1afa9aeaa01f",
  pageTypeSlug: "person",
  slug: "joseph",
  definition: "Joseph Walton, Alan's middle child",
  answeredBy: "claude",
  phone: "+18016363076",
} as const satisfies Person
