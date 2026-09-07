import type { ChangeChecked } from "../../change-checked.page-type.ts"

export const renamePackage = {
  id: "01a079db-f6e1-71b9-af6e-fd2b77ce7f9d",
  pageTypeSlug: "change-checked",
  slug: "rename-package",
  definition:
    "a package renamed wherever that package is named, in its manifest and in every specifier reaching it",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name a package carries is read from the manifest the caller names.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest reading as no JSON object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating no name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name the package already carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no package name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A whole string in a manifest equal to the old name is restated as the new name.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest key is read as a local name whenever the value names a package.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming the package under the old name states the new name instead.",
    },
    {
      invariantKind: "departure",
      statement: "An entry whose value already names the package under the new name is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every manifest the index names is read for the old name.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest keeps the spacing that manifest already carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies reaching the package are the importers of the files the manifest names as ways in.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier that is the old name becomes the new name.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier opening with the old name and a slash keeps the tail past that name.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming no module is left as that string is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is worked out here rather than by a mechanical change reached for that body.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is carried here.",
    },
    {
      invariantKind: "absence",
      statement: "No page is renamed here.",
    },
  ],
} as const satisfies ChangeChecked
