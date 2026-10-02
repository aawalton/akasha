import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const chapterPictured = {
  id: "01a0fd84-f744-7edb-ab5b-96e3dba38ab5",
  type: "page-type/record-property",
  slug: "chapter-pictured",
  propertySlug: "pictured",
  definition: "what one of a written chapter's pictures shows for the first time in its story",
  properties: [
    { pageProperty: "relation-property/cover", required: true, many: false },
    { pageProperty: "text-property/cover-after", required: false, many: false },
    { pageProperty: "relation-property/pictured-character", required: false, many: false },
    { pageProperty: "text-property/pictured-outfit", required: false, many: false },
    { pageProperty: "text-property/pictured-setting", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter pictures each character, outfit and setting its story shows for the first time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a story has pictured is every record its earlier chapters state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Undress is an outfit.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
