import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howManyChecksIRun = {
  id: "01a04625-d808-7189-b17c-aebd9448483c",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-many-checks-i-run",
  title: "How Many Checks I Run",
  definition: "how many automatic checks I keep, against what the trade normally keeps",
  parents: ["how-i-prevent-a-category-of-wrong"],
  related: ["the-graph-i-built-to-run-my-checks"],
  settled:
    "In two decades in tech, the normal pattern I saw for checks was a handful, three to twelve, almost all external packages like typecheck and eslint, with maybe the occasional custom linter rule.\n\nThis year, AI coding ten hours a day sustained, I found it so easy to create custom checks for my specific failure cases that I ended up with about a hundred total.\n\nMost of mine are vendored or custom rather than external packages.",
} as const satisfies AllAboutAlanTopic
