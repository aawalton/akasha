import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const renamePackage = {
  id: "01a079db-f6e1-71b9-af6e-fd2b77ce7f9d",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "rename-package",
  changeMode: "change-mode-rename",
  definition:
    "a package renamed wherever that package is named, in its manifest and in every specifier reaching it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A caller stating no old name reads the old name from the manifest the caller names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller stating an old name renames from that name rather than from the manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A rename the manifest alone carries is finished by a run stating the old name.",
    },
    {
      invariantKind: "departure",
      statement: "The world a change reads is the world the edits before that change leave.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest reading as no JSON object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating no name is refused where the caller states no old name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A new name the package already has is refused where the caller states no old name.",
    },
    {
      invariantKind: "departure",
      statement: "An old name equal to the new name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no package name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An old name that is no package name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A rename answering no edit is refused where the caller states an old name.",
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
      statement:
        "The manifest the caller names is restated only where restating changes that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest keeps the spacing that manifest already has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller stating no old name reaches the importers of the files the manifest names as ways in.",
    },
    {
      invariantKind: "departure",
      statement: "A caller stating an old name reaches every body the index names with that name.",
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
  changeKind: "change-checked",
} as const satisfies ChangeAgent
