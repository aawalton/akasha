import type { WorldClass } from "../../world-class.page-type.ts"

export const amazingLiar = {
  id: "01a0657e-01a7-7968-ae27-b11a29834c7e",
  pageTypeSlug: "world-class",
  slug: "amazing-liar",
  title: "Amazing Liar",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["liar"],
  references: "jsonl",
} as const satisfies WorldClass
