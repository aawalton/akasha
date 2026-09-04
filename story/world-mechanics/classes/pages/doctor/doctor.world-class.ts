import type { WorldClass } from "../../world-class.page-type.ts"

export const doctor = {
  id: "01a0657e-1356-74a2-88f3-e22145b34455",
  pageTypeSlug: "world-class",
  slug: "doctor",
  title: "Doctor",
  worldSlug: "the-wandering-inn",
  aliases: ["doctors"],
  references: "jsonl",
} as const satisfies WorldClass
