import type { Check } from "../check.page-type.ts"

export const requireImportExtension = {
  id: "01a04bcb-c714-7fdf-aa64-e2ff68d4f69b",
  pageTypeSlug: "check",
  slug: "require-import-extension",
  definition:
    "the check refusing a relative specifier written without the extension of the file it names",
  code: "ts",
  test: "ts",
  needs: "file",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    "A specifier naming no path of its own is a package, and a package names no file to carry an extension.",
    "Every file the akasha folder holds is TypeScript, so `.ts` is the only extension a relative specifier carries.",
    "A specifier is judged where it is written, so a file is judged by its own body alone.",
    "No compiler setting decides the answer, because reaching for one would judge a file by something outside the change.",
  ],
} as const satisfies Check
