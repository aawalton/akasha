import type { Check } from "../check.page-type.ts"

export const requireImportExtension = {
  id: "01a04b6d-b59d-7685-98e3-49820af74f34",
  pageTypeSlug: "check",
  slug: "require-import-extension",
  definition: "the check refusing a relative specifier written without the extension of the file it names",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-system", "module/checking"],
  design: [
    "A specifier naming no path of its own is a package, and a package names no file to carry an extension.",
    "Every file the akasha folder holds is TypeScript, so `.ts` is the only extension a relative specifier carries.",
    "A specifier is judged where it is written, so a file is judged by its own body alone.",
  ],
} as const satisfies Check
