import type { Check } from "../check.page-type.ts"

export const noCodeComments = {
  id: "01a04b6d-b5ae-7f56-98e6-46640f7362b9",
  pageTypeSlug: "check",
  slug: "no-code-comments",
  definition: "the check refusing a source file carrying a comment that is none of the code comment forms",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-system", "module/checking"],
  design: [
    "A form earns its place by being parsed by a program, so a comment no program reads is prose whatever it says.",
    "Every file the akasha folder holds is TypeScript, so a form only another language parses stands for nothing here.",
    "A comment is read from the token stream, so text shaped like a comment inside a string or a regex is not one.",
  ],
} as const satisfies Check
