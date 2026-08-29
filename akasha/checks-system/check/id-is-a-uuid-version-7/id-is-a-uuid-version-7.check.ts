import type { Check } from "../check.page-type.ts"

export const idIsAUuidVersion7 = {
  id: "01a04b6d-b5a5-7261-bd8c-fb6e3243dbf4",
  pageTypeSlug: "check",
  slug: "id-is-a-uuid-version-7",
  definition: "the check refusing a page whose stated id is not a uuid version 7 written in lower uuid",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["page-type/page", "domain/akasha-system", "module/checking"],
  design: [
    "The id judged is the one the page states, so an id computed elsewhere is outside this check.",
    "A file stating no page is a file stating no id, and passes for having nothing to judge.",
    "An id is read from the object literal rather than the body, so text shaped like an id elsewhere is not one.",
  ],
} as const satisfies Check
