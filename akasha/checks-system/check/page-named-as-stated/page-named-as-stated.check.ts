import type { Check } from "../check.page-type.ts"

export const pageNamedAsStated = {
  id: "01a04b6b-f0a0-7d7b-8923-3d99c19a38b1",
  pageTypeSlug: "check",
  slug: "page-named-as-stated",
  definition: "the check refusing a page file named otherwise than the page names itself",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-file", "page-type/page", "module/checking"],
  design: [
    "The stem is bound to the `slug` the page states, never to anything a reader would call its title.",
    "A page naming itself otherwise than its file is invisible to the corpus, so nothing else would report it.",
    "A file holding no page value is a property's file, and is not judged here.",
  ],
} as const satisfies Check
