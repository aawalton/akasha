import type { Check } from "../check.page-type.ts"

export const pageNamedAsStated = {
  id: "01a04bcb-c705-720a-a6fb-4dbd5fee1594",
  pageTypeSlug: "check",
  slug: "page-named-as-stated",
  definition: "the check refusing a page whose file name or export name is not the name it states",
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
        "The stem is bound to the `slug` the page states rather than to anything a reader would call its title.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming itself otherwise than its file is invisible to the corpus.",
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
        "A page property's file named for a property the index holds in a file states no page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name is judged against what the page states rather than against what the index records.",
    },
    {
      invariantKind: "departure",
      statement: "The index is asked only which properties are held in a file.",
    },
    {
      invariantKind: "departure",
      statement: "That is asked once for the whole run.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that cannot say which properties are held in a file refuses the run rather than reading as an index naming none and judging every property file a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name the page's value is bound to is judged against the export name its slug makes.",
    },
    {
      invariantKind: "departure",
      statement: "A value bound to no name is refused.",
    },
  ],
} as const satisfies Check
