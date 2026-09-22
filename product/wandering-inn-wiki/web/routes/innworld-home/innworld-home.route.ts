import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldHome = {
  id: "01a0c5e6-86e5-7522-b845-c975565ebb58",
  type: "page-type/route",
  slug: "innworld-home",
  definition: "the front page of the wiki",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The credit to the author of the work sits in the line under the title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The credit names the author and links the author's own site.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page types are drawn in the order and the headings the sidebar draws them in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type wears here the icon that page type wears in the sidebar.",
    },
  ],
} as const satisfies Route
