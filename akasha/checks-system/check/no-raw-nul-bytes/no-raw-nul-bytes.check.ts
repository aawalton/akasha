import type { Check } from "../check.page-type.ts"

export const noRawNulBytes = {
  id: "01a04b6b-ae4f-7d1b-8849-02404ffa931a",
  pageTypeSlug: "check",
  slug: "no-raw-nul-bytes",
  definition: "the check refusing a file carrying a raw NUL byte",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-text", "module/checking"],
  design: [
    "Every file in the akasha folder is judged, and no kind of file is exempt.",
    "A file carrying more than one NUL is reported at the first, with how many stand in it.",
    "A NUL is counted in the bytes, so a body that is not text is judged the same as one that is.",
  ],
} as const satisfies Check
