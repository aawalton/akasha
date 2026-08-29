import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type InvariantKind = "departure" | "absence" | "constraint" | "gap"

export const invariantKind = {
  id: "01a04d66-767b-740d-a958-1f84e5858ad0",
  pageTypeSlug: "page-property-type",
  slug: "invariant-kind",
  definition: "the way a reader gets an invariant wrong",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
  design: [
    {
      invariantKind: "departure",
      statement:
        "A departure is a decision a reader would not guess right; knowing it stops them undoing it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An absence is something the domain deliberately leaves out; knowing it stops a reader adding it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A constraint is a limit from outside the domain; knowing it stops a reader asking for the impossible.",
    },
    {
      invariantKind: "departure",
      statement:
        "A gap is a distance between what the domain says and what it does; knowing it stops a reader relying on it.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The plain word `kind` names which kind of value a property holds, never which kind of invariant.",
    },
  ],
} as const satisfies PagePropertyType
