import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removePackageManifest = {
  id: "01a08294-60d3-7068-afff-2fa2afcd468a",
  pageTypeSlug: "change-agent",
  slug: "remove-package-manifest",
  changeMode: "change-mode-remove",
  definition:
    "a package's manifest taken away, with the package above taking what that manifest named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The package taking over is the nearest package above the folder whose manifest goes.",
    },
    {
      invariantKind: "departure",
      statement: "The root is the package folded into where no other package is above.",
    },
    {
      invariantKind: "departure",
      statement: "A folder under no package at all is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The root's own manifest is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A fold into the root adds no way in, the root naming every file already.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier folded into the root names the file that specifier reached.",
    },
    {
      invariantKind: "departure",
      statement: "A way in naming the package itself is folded into the root too.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a package folded into the root drops that entry.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest names the root nowhere, the root being reached without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A way in opens with the folder path between the two packages.",
    },
    {
      invariantKind: "departure",
      statement: "A way in keeps the spelling that way in had past that opening.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating its ways in as anything but an object of paths is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A package above stating no ways in of its own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency the package above names already is left as that package states it.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency neither package names is stated by the package above.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dependency named as a peer or as optional is stated by the root among its dependencies.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency named for development is stated by the root among its own.",
    },
    {
      invariantKind: "departure",
      statement: "A fold into a package that is not the root is refused a development dependency.",
    },
    {
      invariantKind: "departure",
      statement: "The ways in and the dependencies of the package above are written out afresh.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier naming the folded package names the package above and that folder path.",
    },
    {
      invariantKind: "departure",
      statement: "Every body the index names as typed is read for the folded name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest naming the folded package under a dependency names the package above instead.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest already naming the package above drops that entry rather than restating it.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest a name goes out of or is restated in keeps the spacing it has.",
    },
    {
      invariantKind: "gap",
      statement: "The lockfile the manifest leaves is settled by the landing rather than here.",
    },
    {
      invariantKind: "gap",
      statement:
        "The page the manifest belonged to is retyped by the change for that rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "No page is restated here.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is carried here.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
