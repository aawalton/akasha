import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changePagePageType = {
  id: "01a0827d-a3dc-77be-a528-3c5b25c83d95",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-page-page-type",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page",
  definition: "the page type a body states, restated with the type that body satisfies",
  code: "ts",
  test: "ts",
  guards: [
    "change-guard/import-reaches-a-file",
    "change-guard/relation-reaches-a-page",
    "change-guard/slug-names-one-property",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type the body states now is read off the body rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The page type the body moves to is named by the path of that page type's page.",
    },
    {
      invariantKind: "departure",
      statement: "The type the body is declared to satisfy is restated beside the page type.",
    },
    {
      invariantKind: "departure",
      statement: "The import naming that type is restated to reach the page type named.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating the page type named already is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating no page type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body importing no type named for the page type that body states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path with no body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type named by a path with no body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Each passage is worked by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from that change is the whole answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out which files a page keeps beside it.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
