import type { ChangeMechanicalFile } from "../../change-mechanical-file.page-type.ts"

export const addFilePage = {
  id: "01a07976-d290-7a2a-b91c-bc7a0bc36dca",
  pageTypeSlug: "change-mechanical-file",
  slug: "add-file-page",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page",
  definition: "one page written at one path, with the pages that page names judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/relation-reaches-a-page", "change-guard/identity-not-already-held"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no page name is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      invariantKind: "departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The pages the body names are judged by the guard this change names.",
    },
  ],
} as const satisfies ChangeMechanicalFile
