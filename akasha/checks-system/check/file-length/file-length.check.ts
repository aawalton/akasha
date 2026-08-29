import type { Check } from "../check.page-type.ts"

export const fileLength = {
  id: "01a04b6b-ae46-7be8-95ca-5d76abad239d",
  pageTypeSlug: "check",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-file", "module/checking"],
  design: [
    "The ceiling is counted in bytes, so what a body costs to read does not depend on how it was encoded.",
    "Every file in the akasha folder is judged, and no kind of file is exempt.",
    "A file is judged by its own size alone, so nothing about the rest of the change changes the answer.",
  ],
} as const satisfies Check
