import type { CodeCheck } from "../../code-check.page-type.ts"

export const packageReachedWhereNamed = {
  id: "01a058be-804e-72e0-934d-f1f913e197a6",
  pageTypeSlug: "code-check",
  slug: "package-reached-where-named",
  definition:
    "the check holding a package to the name its manifest states and the ways in it names",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
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
        "A file reached inside a package standing inside another belongs to the inner one.",
    },
    {
      invariantKind: "departure",
      statement: "The package a file belongs to is the only one answering for reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating no exports declares no interface.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package declaring no interface is not enforced against what reaches the package.",
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
      statement: "A package is named in a refusal by what its manifest calls the package.",
    },
    {
      invariantKind: "departure",
      statement: "A package whose manifest calls it nothing is named by its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A package name is judged where the change carries its manifest.",
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
      statement: "What a package keeps to itself is the code its pages hold.",
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
  ],
} as const satisfies CodeCheck
