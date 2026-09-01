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
      statement: "A world a check hands to a foreign engine holds the change rather than the tree.",
      workingMemory:
        "`worldOf` in `code-tests` copies the committed index into the scratch rather than the shadow, and symlinks the world's top-level `node_modules` to the real tree's `@akasha/*` farm. `lint-clean` materialises only the changed files, so nearly every `@akasha/*` import inside its world resolves out to the live working tree.",
    },
    { statement: "What a landing pays for a world built from the change is measured." },
    { statement: "A check cannot reach the index or the tree as they were before the change." },
  ],
  constraints: [
    "No check is weakened, skipped or disabled to make a verdict hold.",
    "A change that moves a verdict lands apart from one that cannot.",
    "Nothing outside the akasha folder is judged.",
  ],
} as const satisfies Initiative
