import type { WorldClass } from "../../world-class.page-type.ts"

export const sandMage = {
  id: "01a0657e-024a-78a2-b46d-8041a8bd32a9",
  pageTypeSlug: "world-class",
  slug: "sand-mage",
  title: "Sand Mage",
  worldSlug: "the-wandering-inn",
  aliases: ["sand-mages"],
  evolvesToSlugs: ["bloodglass-mage"],
  references: "jsonl",
} as const satisfies WorldClass
