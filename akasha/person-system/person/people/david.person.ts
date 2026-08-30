import type { Person } from "../person.page-type.ts"

export const david = {
  id: "01a053fe-00f0-7112-a569-989bfe576b71",
  pageTypeSlug: "person",
  slug: "david",
  definition: "David Eggertsen, Alan's friend since childhood",
  answeredBy: "amy",
  phone: "+14355720344",
  emailAddress: "deggertsen@gmail.com",
} as const satisfies Person
