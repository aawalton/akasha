import type { Person } from "../person.page-type.ts"

export const jenny = {
  id: "01a053fe-00f0-7efb-8843-89602ea5d18b",
  pageTypeSlug: "person",
  slug: "jenny",
  definition: "Jennifer Walton, Alan's wife",
  answeredBy: "claude",
  phone: "+16085122511",
  emailAddress: "smilingjenny@gmail.com",
  supabaseAuthUserId: "9bc63b11-d301-4a51-8839-7371336262c7",
} as const satisfies Person
