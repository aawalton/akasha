import type { ChangeMechanicalFile } from "../../change-mechanical-file.page-type.ts"

export const moveFilePage = {
  id: "01a0820d-23fd-7cc2-9bef-074f9f70e6ac",
  pageTypeSlug: "change-mechanical-file",
  type: "change-mechanical-file",
  slug: "move-file-page",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page moved to another folder with every file that page keeps beside the page",
  code: "ts",
  test: "ts",
  guards: ["change-guard/claimed-file-not-left-behind"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A move keeps the name the page has, so a landing naming it anew is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index files no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page and every file that page keeps beside the page are moved together.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files sit beside a page is read from the index rather than from the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file the page claims and the tree has no body at is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page lands under its own name in the folder the page lands in.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page under a TypeScript name is moved by `move-file-code`.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file beside the page is moved by `move-file`.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from any change reached here refuses the whole move.",
    },
    {
      invariantKind: "departure",
      statement: "The files beside the page are judged by the guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the data the page states.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFile
