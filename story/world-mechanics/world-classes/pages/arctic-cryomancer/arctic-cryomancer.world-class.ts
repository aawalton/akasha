import type { WorldClass } from "../../world-class.page-type.ts"

export const arcticCryomancer = {
  id: "01a0657e-132f-75ca-a822-6a4c79bba9b2",
  pageTypeSlug: "world-class",
  slug: "arctic-cryomancer",
  title: "Arctic Cryomancer",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["relicbound-arctic-cryomancer"],
  references: "jsonl",
} as const satisfies WorldClass
