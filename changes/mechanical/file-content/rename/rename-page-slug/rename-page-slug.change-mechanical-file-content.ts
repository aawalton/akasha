import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const renamePageSlug = {
  id: "01a07718-c9b6-7230-ae96-ff2f36a19ec1",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "rename-page-slug",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one page's slug restated in its own body and in the data of every page naming it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A slug past the hundred characters a page's slug holds is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A slug's length is bounded here as it is where a page is composed.",
    },
    {
      invariantKind: "departure",
      statement: "A rung this change reaches reads the splices this change answers.",
    },
    {
      invariantKind: "departure",
      statement: "Those splices are settled onto the ledger rather than onto a world made here.",
    },
    {
      invariantKind: "departure",
      statement: "A plural the page states already is left alone rather than restated.",
    },
  ],
  changeKind: "change-mechanical",
  guards: ["change-guard/slug-names-one-property"],
} as const satisfies ChangeMechanicalFileContent
