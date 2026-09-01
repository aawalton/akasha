import type { CodeCheck } from "../../code-check.page-type.ts"

export const importsInside = {
  id: "01a04bcb-dfe3-7bd6-afaf-9470bb845f82",
  pageTypeSlug: "code-check",
  slug: "imports-inside",
  definition: "the check refusing an akasha file that imports a file outside the akasha folder",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A specifier naming a package lands where the manifests name the package.",
    },
    {
      invariantKind: "departure",
      statement: "A package landing outside the akasha folder is refused like any other path.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier no manifest names lands nowhere and is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A package reached through `node_modules` is named by no manifest here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workspace the root manifest names is read at the manifest beneath the workspace.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace the root manifest names by a pattern is answered by the index.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests are read as the change would leave the manifests.",
    },
    {
      invariantKind: "departure",
      statement: "Where a relative specifier lands is decided by the file holding the specifier.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is judged where the specifier is written.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is judged by where the specifier lands rather than by what is there.",
    },
    {
      invariantKind: "departure",
      statement: "The boundary is drawn at the path separator.",
    },
    {
      invariantKind: "gap",
      statement: "A reader of akasha needs nothing outside akasha to follow what akasha says.",
    },
  ],
} as const satisfies CodeCheck
