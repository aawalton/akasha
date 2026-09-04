import type { Module } from "@akasha/code-system/module"

export const packageRenaming = {
  id: "01a05db4-4c3b-7000-846e-a71e6c71e1e3",
  pageTypeSlug: "module",
  slug: "package-renaming",
  definition: "a workspace package's name changed wherever a body or a manifest spells it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package is found by the manifest calling the package that name.",
    },
    {
      invariantKind: "departure",
      statement: "A name no manifest carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name another package already carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling names the package where the spelling is the whole name.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling names the package where the name is followed by a slash.",
    },
    {
      invariantKind: "absence",
      statement: "A longer name this one only opens is not the package.",
    },
    {
      invariantKind: "departure",
      statement: "A way in past the name keeps the tail that way in already carries.",
    },
    {
      invariantKind: "departure",
      statement: "A body is respelled at the string literals the parser finds.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming the package is respelled whether or not it names a module.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is respelled over its quoted text rather than through its values.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest keeps every byte the rename does not reach.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming the package is respelled as a value naming it is.",
    },
    {
      invariantKind: "absence",
      statement: "A file that is neither code nor a manifest is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests read are the ones the index names.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says how many manifests and how many bodies were respelled.",
    },
    {
      invariantKind: "departure",
      statement: "Which files name the package is answered by `outside-naming`.",
    },
    {
      invariantKind: "departure",
      statement: "A tracked file naming the package is respelled in the same commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the index does not carry is respelled at the name itself rather than through the parser.",
    },
    {
      invariantKind: "absence",
      statement: "A file the index already respelled is not respelled a second time.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest key naming the package is respelled as a bare specifier is.",
    },
    {
      invariantKind: "departure",
      statement: "A lockfile entry naming the package is respelled as a bare specifier is.",
    },
    {
      invariantKind: "absence",
      statement: "A longer package name this one only opens is left alone wherever it stands.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says how many files the index does not carry were respelled.",
    },
    {
      invariantKind: "departure",
      statement: "A search git could not run refuses the whole rename.",
    },
    {
      invariantKind: "absence",
      statement: "No folder moves and no page's slug changes.",
    },
    {
      invariantKind: "gap",
      statement: "A name spelled inside a template is respelled as one written whole is.",
    },
    {
      invariantKind: "departure",
      statement: "The new name is reachable before the checks judge the rename.",
    },
    {
      invariantKind: "departure",
      statement: "A link this made is taken back where the rename does not land.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run takes back the link the dry run made.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says the lockfile wants settling under the new name.",
    },
    {
      invariantKind: "absence",
      statement: "The lockfile is not written here.",
    },
  ],
} as const satisfies Module
