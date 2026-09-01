import type { Initiative } from "../initiative.page-type.ts"

export const aineChecksJudgeTheChange = {
  id: "01a05e19-4c58-709b-9a7f-acfa62c725de",
  pageTypeSlug: "initiative",
  slug: "aine-checks-judge-the-change",
  domainSlug: "workspace-package/checks-system",
  personaSlug: "aine",
  intents: [
    {
      statement: "A check the differential leaves untried is told apart from one it found sound.",
      workingMemory:
        "The differential runs 42 checks over 10 scenarios and reports all 42 held. Only 5 refused anything in either reading, so 37 held by answering nothing twice. `invariant-earns-its-place` runs zero times and holds vacuously. A held verdict is currently reported the same whether the check was exercised or not.",
    },
    {
      statement: "The differential answers for a check written to read the tree.",
      workingMemory:
        "Both known movers were caught only after scenarios were added for them: without the manifest-and-body pair the old typecheck reads as held, without the package-edge pair the old tests-pass reads as held. The controls were built at `da201217c1^` and `372aa7fa86` and live in no test. The scenario set is the instrument.",
    },
    {
      statement: "The change an audit judges is one a tree can contradict.",
      workingMemory:
        "At audit `everythingIn(root)` makes before and after one closure, `nothingMoved` is true, and the shadow falls through to `shadowAt(root)`, which reads the tree. So the change is the tree and content it does not describe is undefined. No audit-shaped scenario has been run.",
    },
    { statement: "What a landing pays for a world built from the change is measured." },
    { statement: "Every check is handed a world built from the change alone." },
    { statement: "A check reading the tree where the change says otherwise cannot land." },
  ],
  constraints: [
    "No check is weakened, skipped or disabled to make a verdict hold.",
    "A verdict that held is no proof until the check refused in a reading.",
    "Nothing outside the akasha folder is judged.",
  ],
} as const satisfies Initiative
