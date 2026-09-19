import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const aPageTypeWithItsParts = {
  id: "01a0626e-045c-71cf-8781-17811b8d9f9d",
  type: "page-type/folder-shape",
  slug: "a-page-type-with-its-parts",
  definition:
    "the shape of a folder with one page type, its parts and the pages and properties it declares",
  code: "ts",
  test: "ts",
  enabled: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder has one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That page is a page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder may have a second page beside that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That second page is a domain of the page type's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other second page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type names the folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That second page names no folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder has the name that page calls its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other file in the folder is a part the page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that second page states is a part of the folder too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder named `modules` is a part of that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder named `pages` is a part of that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder named `properties` is a part of that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder named `scripts` is a part of that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subfolder named a plural a page type gathers its pages under is a part of that page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What such a subfolder holds is judged where that subfolder is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder with a page the page type declares a part is a part too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder with a page that second page declares a part is a part too.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder with no page the page type declares is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder with a second page that is no domain of the first is no part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder named `workstation-services` is a part of that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subfolder a file this page's own property names sits under is a part of that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The folder may have the page type's slug with the names of the pages above taken off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder may have the plural that page's own type gathers its pages under.",
    },
  ],
} as const satisfies FolderShape
