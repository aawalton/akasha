import type { Person } from "../person.page-type.ts"

export const alan = {
  id: "01a053fe-00ef-7d9b-9231-0340262cf86e",
  pageTypeSlug: "person",
  slug: "alan",
  definition: "the person this system answers to",
  answeredBy: "amy",
  phone: "+16085122510",
  emailAddress: "aawalton@gmail.com",
  supabaseAuthUserId: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
} as const satisfies Person
