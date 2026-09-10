import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.types.ts"

export const changeDomainParent = {
  id: "01a08244-bf2d-7a34-9f71-759e3754a1ed",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "change-domain-parent",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one page made a part of another page rather than of the page naming it now",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page and a parent are named as parts rather than as paths.",
    },
    {
      invariantKind: "departure",
      statement: "The parent a page has now is read from the index rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A page no page names among its parts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the change putting a value into a property.",
    },
    {
      invariantKind: "departure",
      statement: "A page more than one page names among its parts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names each parent.",
    },
    {
      invariantKind: "departure",
      statement: "A page already a part of the parent named is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The new parent gains the spelling the old parent used.",
    },
    {
      invariantKind: "departure",
      statement: "The mechanical changes take the value out and put the value in.",
    },
    {
      invariantKind: "departure",
      statement: "Those changes are reached through the runner rather than by an import.",
    },
    {
      invariantKind: "departure",
      statement: "The mechanical answers are gathered into one answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A parent stating no parts gains the list rather than being refused.",
    },
    {
      invariantKind: "departure",
      statement: "The list is put in by the change putting a key in rather than a value.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
