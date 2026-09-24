import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export type Filed = {
  readonly size: number
  readonly read: (from: number, upTo: number) => Uint8Array
}

export type Reach = {
  target: <Held>(slug: string) => Held | null
  naming: <Held>(propertySlug: string) => readonly Held[]
  file: (path: string) => Filed | null
  folder: (path: string) => readonly string[] | null
}

export type Work<Page, Held> = (page: Page, reach: Reach) => Held | null

export const computedProperty = {
  id: "01a06e70-0f25-77ad-9080-95388ef3ba51",
  type: "page-type/page-type",
  slug: "computed-property",
  definition: "a page property a function works out from the page",
  extends: ["page-type/page-property"],
  parts: [
    "boolean-property/asked-by-name",
    "select-property/holds",
    "text-property/read-files",
    "text-property/read-folders",
  ],
  properties: [
    { pageProperty: "select-property/holds", required: true, many: false },
    { pageProperty: "code-file-property/code", required: true, many: false },
    { pageProperty: "code-file-property/test", required: false, many: false },
    { pageProperty: "code-file-property/test-fixtures", required: false, many: false },
    { pageProperty: "text-property/select-values", required: false, many: true, maxCount: null },
    { pageProperty: "relation-property/target-page-type", required: false, many: false },
    { pageProperty: "one-of-property/properties", required: false, many: true, maxCount: null },
    { pageProperty: "boolean-property/asked-by-name", required: false, many: false },
    {
      pageProperty: "text-property/read-files",
      required: false,
      many: true,
      maxCount: null,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/read-folders",
      required: false,
      many: true,
      maxCount: null,
      uncommitted: true,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page has no value for a computed property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page file stating a value for a computed property is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A computed property's calculation is a function the code file beside the page exports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The function a computed property's code file exports is named `work`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed property states the kind of value the calculation works out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A calculation answering another kind than the computed property states is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation is handed the page whose computed property is being worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A calculation reaches another page or a file only through the reach that calculation is handed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No calculation reads or writes anything by itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach names one page or every page naming the page being worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reach names a file by its path and answers that file's size and any run of its bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is not there is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reach names a folder by its path and answers the sorted names that folder holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder that is not there is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a calculation reads is kept on its computed property, outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change to anything a computed property reads is a change to each page it is on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages naming one page are reached under the relation property that names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each page a reach answers is worked as lazily as the page handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The shape of a reach is declared here rather than beside the engine working a calculation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A query may answer with a computed property's key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed property may be answered only where a question names its key.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation answering absent puts no key in the row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No calculation is written as an expression the system parses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A computed property's code is loaded by the engine working it rather than imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation answering one of a set of values states that set as page data.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No computed property's type is a hand-written union.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation's `Held` type argument is the type written beside its property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The compiler reads a computed property's stated kind against what its calculation answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation holding a relation has the type a relation property has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A computed property holding a relation states the page type that relation reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed property stating a page type to reach holds a relation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A computed property holding records declares the fields of a record as a record property does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A calculation holding a relation answers the address of a page of the type reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value a calculation holding a relation works out is drawn as a relation's value is.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
