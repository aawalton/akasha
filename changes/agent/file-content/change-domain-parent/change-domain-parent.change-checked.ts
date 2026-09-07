import type { ChangeChecked } from "../../../checked/change-checked.page-type.ts"

export const changeDomainParent = {
  id: "01a0795e-9c4f-7299-9238-117baca6b57e",
  pageTypeSlug: "change-checked",
  slug: "change-domain-parent",
  changeModeSlug: "change-mode-change",
  definition: "one page made a part of another page rather than of the page naming it now",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
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
      invariantKind: "gap",
      statement: "A parent stating no parts is refused rather than gaining the list.",
    },
  ],
} as const satisfies ChangeChecked
