import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changeFileContent = {
  id: "01a07810-fb33-7e75-8e1e-ce1e302d5668",
  type: "page-type/change-mechanical-file-content",
  slug: "change-file-content",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "one passage of one body replaced by another, with nothing else judged",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call works one passage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage that is not alone in the body is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage the body has nowhere is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage of no characters is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with no body is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change leaving the body as the body was is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body worked on is the body the world answers rather than the body on disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges what the passage put in leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The calling change judges what the passage put in leaves.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
