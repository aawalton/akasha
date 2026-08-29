import type { Check } from "../check.page-type.ts"

export const pageNamedAsStated = {
  id: "01a04bcb-c705-720a-a6fb-4dbd5fee1594",
  pageTypeSlug: "check",
  slug: "page-named-as-stated",
  definition: "the check refusing a page file named otherwise than the page names itself",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
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
      statement: "A file holding no page value is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "A file is a page only where its own name states a page type.",
    },
    {
      invariantKind: "absence",
      statement:
        "A page property's file, named for a property the index holds in a file, states no page type, so it is not judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name is judged against what the page states, never against what the index records of that page. The index is asked one thing only, which properties are held in a file, and asked once for the whole run rather than once a file.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that cannot say which properties are held in a file refuses the run, rather than reading as an index naming none and judging every property file a page.",
    },
  ],
} as const satisfies Check
