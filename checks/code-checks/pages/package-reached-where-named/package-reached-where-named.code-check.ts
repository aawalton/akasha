import type { CodeCheck } from "../../code-check.page-type.ts"

export const packageReachedWhereNamed = {
  id: "01a058be-804e-72e0-934d-f1f913e197a6",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "package-reached-where-named",
  definition:
    "the check holding a package to the name its manifest states and the ways in it names",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The packages are found in the index under every page type descending from `workspace-package`.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the index files no page under is answered as no packages.",
    },
    {
      invariantKind: "departure",
      statement: "A package's folder is the folder its page stands in.",
    },
    {
      invariantKind: "departure",
      statement: "The name a manifest stands under is asked of the index.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is read as the change leaves the manifest.",
    },
    {
      invariantKind: "departure",
      statement: "Only a string target in the exports map names a way in.",
    },
    {
      invariantKind: "departure",
      statement: "A target is resolved against the package's folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file inside a package reaches its siblings directly.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file reached inside a package nested inside another package belongs to the inner package.",
    },
    {
      invariantKind: "departure",
      statement:
        "The package a file belongs to is the only package answering for reaching that file.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating no exports declares no interface.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package declaring no interface is not enforced against the files that reach the package.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that is absent or will not parse declares no interface.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating an empty exports map names no way in.",
    },
    {
      invariantKind: "departure",
      statement: "A package is named in a refusal by the name its manifest calls the package.",
    },
    {
      invariantKind: "departure",
      statement: "A package whose manifest calls that package nothing is named by its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A package name is judged where the change has its manifest.",
    },
    {
      invariantKind: "departure",
      statement: "Each part of a package name past the at sign is judged in `lower-kebab-case`.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating no name states no package name.",
    },
    {
      invariantKind: "departure",
      statement: "Every way a specifier can be written is a way in.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming no path is the way in the manifest names.",
    },
    {
      invariantKind: "departure",
      statement: "A page is reached from anywhere.",
    },
    {
      invariantKind: "departure",
      statement: "A package keeps to itself only the code its pages have.",
    },
    {
      invariantKind: "departure",
      statement: "A landing is a page where the index files the page under its own path.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot say which packages stand refuses rather than judging clean.",
    },
    {
      invariantKind: "absence",
      statement: "An index naming no package judges clean.",
    },
    {
      invariantKind: "departure",
      statement: "The written type beside a page is reached wherever that page is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file beside a page under another section is reached only where a manifest names it.",
    },
  ],
} as const satisfies CodeCheck
