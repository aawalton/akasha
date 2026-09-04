import type { CodeCheck } from "../../code-check.page-type.ts"

export const pageNamedAsStated = {
  id: "01a04bcb-c705-720a-a6fb-4dbd5fee1594",
  pageTypeSlug: "code-check",
  slug: "page-named-as-stated",
  definition: "the check refusing a page whose file name or export name is not the name it states",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The stem is the `slug` the page states rather than a title a reader would give the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming itself otherwise than its file is invisible to the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page's file states one page.",
    },
    {
      invariantKind: "departure",
      statement: "A page a file states past the first is invisible to the index.",
    },
    {
      invariantKind: "departure",
      statement: "Every page a file states past the first is said in one refusal.",
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
      statement: "The index is asked only which properties are held in a file.",
    },
    {
      invariantKind: "departure",
      statement: "That question is asked of the index as the change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement: "That question is asked once for the whole run.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot say which properties a file holds refuses the run.",
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
    {
      invariantKind: "departure",
      statement: "The name a file carries is judged against the first page the file states.",
    },
  ],
} as const satisfies CodeCheck
