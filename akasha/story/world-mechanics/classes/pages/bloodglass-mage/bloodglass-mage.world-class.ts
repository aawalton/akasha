import type { WorldClass } from "../../world-class.page-type.ts"

export const bloodglassMage = {
  id: "01a0657e-133f-7280-9f80-04277fe6e2ce",
  pageTypeSlug: "world-class",
  slug: "bloodglass-mage",
  title: "Bloodglass Mage",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["sand-mage"],
  references: "jsonl",
} as const satisfies WorldClass
