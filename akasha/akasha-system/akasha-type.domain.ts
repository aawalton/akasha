import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaType = {
  id: "01a049e9-651c-7006-896c-2bffa71e2d0a",
  pageTypeSlug: "domain",
  slug: "akasha-type",
  definition: "the shape a value must have",
  partSlugs: [
    "akasha-import",
  ],
  requiredReadingSlugs: [
    "akasha-import",
  ],
  design: [
    "A type is gone by the time the code runs.",
    "A page's type is derived from the page's value.",
  ],
  intent: [
    "A page of the wrong shape does not compile.",
    "A limit no type can carry is enforced by a check.",
  ],
} as const satisfies Domain
