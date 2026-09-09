import type { CodeCheck } from "../../code-check.page-type.ts"

export const requireImportExtension = {
  id: "01a04bcb-c714-7fdf-aa64-e2ff68d4f69b",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "require-import-extension",
  definition:
    "the check refusing a relative specifier written without the extension of the file it names",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A specifier naming no path of its own is a package.",
    },
    {
      invariantKind: "constraint",
      statement: "A package names no file to carry an extension.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relative specifier with no extension is refused where the file it names stands.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier no file of these extensions stands at is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A relative specifier carrying `.ts` stands.",
    },
    {
      invariantKind: "departure",
      statement: "A relative specifier carrying `.tsx` stands.",
    },
    {
      invariantKind: "departure",
      statement: "A relative specifier carrying `.css` stands.",
    },
    {
      invariantKind: "departure",
      statement: "A relative specifier with any other extension is refused where that file stands.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is judged where the specifier is written.",
    },
    {
      invariantKind: "departure",
      statement: "No compiler setting decides the answer.",
    },
  ],
} as const satisfies CodeCheck
