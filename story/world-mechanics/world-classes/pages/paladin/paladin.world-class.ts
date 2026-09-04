import type { WorldClass } from "../../world-class.page-type.ts"

export const paladin = {
  id: "01a0657e-13b5-7268-9de9-07b55af3419c",
  pageTypeSlug: "world-class",
  slug: "paladin",
  title: "Paladin",
  worldSlug: "the-wandering-inn",
  aliases: ["paladins"],
  references: "jsonl",
} as const satisfies WorldClass
