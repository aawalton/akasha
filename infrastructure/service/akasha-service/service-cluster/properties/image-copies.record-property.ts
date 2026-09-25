import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const imageCopies = {
  id: "01a0d984-8903-7219-8fa6-051b24b5fd04",
  type: "page-type/record-property",
  slug: "image-copies",
  propertySlug: "image-copies",
  definition: "the files a workload's pod copies out of an image into its checkout",
  properties: [
    { pageProperty: "text-property/copy-image", required: true, many: false },
    { pageProperty: "text-property/copy-from", required: true, many: false },
    { pageProperty: "text-property/copy-to", required: true, many: false },
    { pageProperty: "text-property/copied-files", required: true, many: true, maxCount: null },
    { pageProperty: "text-property/copy-env", required: true, many: false },
    { pageProperty: "text-property/source-hash", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a workload keeping a checkout copies files into it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are copied after the checkout is made and before the build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The container copying the files is named for the directory it copies into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image tagged latest is pulled at every start, and any other image only where the node lacks it.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
