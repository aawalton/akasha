import type { Person } from "../person.page-type.ts"

export const katara = {
  id: "01a053fe-00f1-74b6-a49f-9f577dba1047",
  pageTypeSlug: "person",
  slug: "katara",
  definition: "Katara Walton, Alan's youngest child",
  answeredBy: "claude",
  phone: "+13854521484",
} as const satisfies Person
