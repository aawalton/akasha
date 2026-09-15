import type { ChangeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.types.ts"

export const moveFilePage = {
  id: "01a0820d-23fd-7cc2-9bef-074f9f70e6ac",
  type: "page-type/change-mechanical-file",
  slug: "move-file-page",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page moved to another folder with every file that page keeps beside the page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A move keeps the name the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the index files no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page and every file that page keeps beside the page are moved together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page's own file is carried after every file beside it but the one naming its importers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is asked which bodies import it while the page owning it is still there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which files sit beside a page is read from the index rather than from the folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the page claims and the tree has no body at is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside the page lands under its own name in the folder the page lands in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside the page under a TypeScript name is moved by `move-file-code`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other file beside the page is moved by `move-file`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal from any change reached here refuses the whole move.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes the data the page states.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file naming what imports the page is carried after every other file.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFile
