import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.ts"

export const removeFolderPackage = {
  id: "01a0824a-d2c6-7488-8bfd-742aa19c8ef2",
  pageTypeSlug: "change-mechanical-folder",
  slug: "remove-folder-package",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder-package",
  definition: "one workspace package taken away with the folder that package sits in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page that is no workspace package is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The folder taken away is the folder the package page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The removal is worked out by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The name the package has is read from the manifest beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming that name among what it depends on refuses the removal.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest under the folder going away is no reason for that folder to stay.",
    },
    {
      invariantKind: "departure",
      statement: "A package whose page has no manifest beside it is taken away unjudged.",
    },
    {
      invariantKind: "gap",
      statement: "A manifest depending on the package drops that name by a change of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here drops the name a manifest depends on.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here drops the package's name from a workspace, folders being named by a pattern.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFolder
