import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theToolThatIsAlsoADependency = {
  id: "01a0c5a0-f4db-7b25-a0c1-e045a13860b7",
  type: "page-type/all-about-alan-topic",
  slug: "the-tool-that-is-also-a-dependency",
  title: "The Tool That Is Also A Dependency",
  definition: "a thing I own that reduces what I need and needs a company to keep working",
  parents: ["all-about-alan-topic/what-i-can-do-outside-software"],
  related: ["all-about-alan-topic/which-dependency-i-deal-with-first"],
  settled:
    "My laser engraver is two things at once. It lets me fabricate a part I would otherwise have to buy, and it needs the maker's cloud to run at all, so they can switch it off from where they are.\n\nBoth sides count when I rank it. Counting only the first one flatters it, and counting only the second misses why I bought it.\n\nI expect to meet more of this shape rather than less. A capability that arrives as a connected device brings the vendor in with it.",
} as const satisfies AllAboutAlanTopic
