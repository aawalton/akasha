import type { Initiative } from "../initiative.page-type.ts"

export const aineChecksJudgeTheChange = {
  id: "01a05e19-4c58-709b-9a7f-acfa62c725de",
  pageTypeSlug: "initiative",
  slug: "aine-checks-judge-the-change",
  domainSlug: "workspace-package/checks",
  personaSlug: "aine",
  intents: [
    {
      statement: "A check reads the index as the change leaves the index.",
      workingMemory:
        "Index readers take `given: string | Reading`, and a root reads the committed index. Some take an optional reading defaulting to the committed index, so omitting an argument reads the before state and no search finds it. `shadow.index` binds the reading. Checks migrate one at a time, then `shadow.reading` comes off, so anything unmigrated stops compiling.",
    },
    {
      statement: "What a landing pays for a world built from the change is measured.",
      workingMemory:
        "Measured warm for a one-file patch on 2026-09-02, at a5c3d23c8e: standing the world up cost `tests-pass` 4.9s to 8.1s over some 30,000 paths, `lint-clean` 2.6s to 4.2s, `shell-clean` 3.2s to 3.9s. Nearly all of that was `cpSync` of the 77,000-file index. Dropping it where no engine reads it took `lint-clean` and `shell-clean` to about 10ms. Writing the shadow's filings over the copy costs `tests-pass` nothing readable above the noise.",
    },
    { statement: "A check cannot reach the index or the tree as they were before the change." },
  ],
  constraints: [
    "No check is weakened, skipped or disabled to make a verdict hold.",
    "A change that moves a verdict lands apart from one that cannot.",
    "Nothing outside the akasha folder is judged.",
  ],
} as const satisfies Initiative
