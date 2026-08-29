import type { Check } from "../check.page-type.ts"

export const importsInside = {
  id: "01a04b5e-39e5-7730-9318-c34e7807c200",
  pageTypeSlug: "check",
  slug: "imports-inside",
  definition: "the check refusing an akasha file that imports a file outside the akasha folder",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-import", "domain/akasha-system", "module/checking"],
  design: [
    "A specifier naming no path of its own is a package, and a package is not the akasha folder's business.",
    "Where a relative specifier lands is decided by the file holding it, never by where the check was run from.",
    "A specifier is judged where it is written, so a file is judged by its own body alone.",
  ],
} as const satisfies Check
