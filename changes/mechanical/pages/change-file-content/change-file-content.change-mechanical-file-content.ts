import type { ChangeMechanicalFileContent } from "../../file-content/change-mechanical-file-content.page-type.ts"

export const changeFileContent = {
  id: "01a07810-fb33-7e75-8e1e-ce1e302d5668",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-file-content",
  changeModeSlug: "change-mode-change",
  changeTargetTypeSlug: "change-target-type/file-content",
  definition: "one passage of one body replaced by another, with nothing else judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call works one passage.",
    },
    {
      invariantKind: "departure",
      statement: "A passage that is not alone in the body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A passage the body holds nowhere is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A passage of no characters is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding no body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A change leaving the body as the body was is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The body worked on is the body the world answers rather than the body on disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies ChangeMechanicalFileContent
