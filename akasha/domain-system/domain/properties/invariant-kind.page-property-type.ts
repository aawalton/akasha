import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type DesignKind = "departure" | "absence" | "constraint"
export type IntentKind = "gap"
export type ConditionKind = "stopgap" | "upkeep"
export type InvariantKind = DesignKind | IntentKind | ConditionKind

export const invariantKind = {
  id: "01a04d66-767b-740d-a958-1f84e5858ad0",
  pageTypeSlug: "page-property-type",
  slug: "invariant-kind",
  definition: "which sort of invariant one entry is",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
  design: [
    {
      invariantKind: "departure",
      statement: "Design, intent and condition each take their own kinds, and share none.",
    },
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
        "An absence earns its place only where what is left out is near enough to what is kept to be reached for by mistake.",
    },
    {
      invariantKind: "departure",
      statement:
        "A constraint is a limit nobody here chose; knowing it stops a reader asking for the impossible.",
    },
    {
      invariantKind: "departure",
      statement:
        "A gap is a distance between what the domain says and what it does; knowing it stops a reader relying on it.",
    },
    {
      invariantKind: "departure",
      statement: "A stopgap is a state kept by hand until something is built to hold it.",
    },
    {
      invariantKind: "departure",
      statement: "Upkeep is a state kept by hand because nothing could be built to hold it.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The plain word `kind` names which kind of value a property holds, never which kind of invariant.",
    },
  ],
} as const satisfies PagePropertyType
