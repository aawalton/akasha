import type { Check } from "../check.page-type.ts"

export const pageNamedAsStated = {
  id: "01a04bcb-c705-720a-a6fb-4dbd5fee1594",
  pageTypeSlug: "check",
  slug: "page-named-as-stated",
  definition: "the check refusing a page file named otherwise than the page names itself",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement:
        "The stem is bound to the `slug` the page states, never to anything a reader would call its title.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page naming itself otherwise than its file is invisible to the corpus, so nothing else would report it.",
    },
    {
      invariantKind: "absence",
      statement: "A file holding no page value is a property's file, and is not judged here.",
    },
    {
      invariantKind: "departure",
      statement: "The name is judged against what the page states, never against the index.",
    },
  ],
} as const satisfies Check
