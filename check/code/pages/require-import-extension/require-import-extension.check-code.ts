import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const requireImportExtension = {
  id: "01a04bcb-c714-7fdf-aa64-e2ff68d4f69b",
  type: "page-type/check-code",
  slug: "require-import-extension",
  definition:
    "the check refusing a relative specifier written without the extension of the file it names",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A specifier naming no path of its own is a package.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A package names no file to carry an extension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A relative specifier with no extension is refused where the file it names stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier no file of these extensions stands at is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relative specifier carrying `.ts` stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relative specifier carrying `.tsx` stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relative specifier carrying `.css` stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relative specifier with any other extension is refused where that file stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier is judged where the specifier is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No compiler setting decides the answer.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
