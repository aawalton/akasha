import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const partsUnderThePageTheyName = {
  id: "01a0b7b9-3324-771e-8a19-95ddc1ea343a",
  type: "page-type/folder-shape",
  slug: "parts-under-the-page-they-name",
  definition: "the shape of a folder gathering under a plural the pages naming the page above",
  code: "ts",
  test: "ts",
  enabled: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is named the plural one or more page types gather their pages under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named no page type's plural is refused before anything else is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page here is of one of those page types or of a page type extending one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder above holds a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder above holding no page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page here names the page above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page above is named by its page type and slug together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page above answering with two addresses is held by the one the pages here name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page sits here as a file of its own or in a folder of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside a page that page states nowhere is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is neither a page nor a file beside one is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder gathering no page at all is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The files a page in a folder of its own holds are judged where that page is.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A page in a folder of its own is read for what that page names.",
    },
  ],
} as const satisfies FolderShape
