import type { Check } from "../check.page-type.ts"

export const fileLength = {
  id: "01a04bcb-c6e7-7e01-9b01-3cad38df56be",
  pageTypeSlug: "check",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling",
  code: "ts",
  test: "ts",
  needs: "file",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    "The ceiling is counted in bytes, so what a body costs to read does not depend on how it was encoded.",
    "Every file in the akasha folder is judged, and no kind of file is exempt.",
    "A file is judged by its own size alone, so nothing about the rest of the change changes the answer.",
  ],
} as const satisfies Check
