import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const partsUnderTheirPlural = {
  id: "01a0a5c5-2740-7001-863a-0802035387a4",
  type: "page-type/folder-shape",
  slug: "parts-under-their-plural",
  definition: "the shape of a folder gathering a page type's pages under that type's plural",
  code: "ts",
  test: "ts",
  enabled: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is named the plural a page type gathers its pages under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named no page type's plural is refused before anything else is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "More than one page type gathers its pages under one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of any of those page types is admitted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of a page type extending one of those page types is admitted too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page sits here as a file of its own or in a folder of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page here is a part the page above the folder declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder above holding no page is asked for no part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is neither a page nor a file beside one is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside a page that page states nowhere is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The files a page in a folder of its own holds are judged where that page is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page type of the folder above.",
    },
  ],
} as const satisfies FolderShape
