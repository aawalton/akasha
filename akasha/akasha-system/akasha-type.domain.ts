import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaType = {
  id: "01a049e9-651c-7006-896c-2bffa71e2d0a",
  pageTypeSlug: "domain",
  slug: "akasha-type",
  definition: "the shape a value must have",
  partSlugs: ["domain/akasha-import"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A type is gone by the time the code runs.",
    },
    {
      invariantKind: "departure",
      statement: "A page satisfies its type rather than being annotated with it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's TypeScript type is declared in the page type file.",
    },
    {
      invariantKind: "gap",
      statement: "A page of the wrong shape does not compile.",
    },
    {
      invariantKind: "gap",
      statement: "A limit no type can carry is enforced by a check.",
    },
  ],
} as const satisfies Domain
