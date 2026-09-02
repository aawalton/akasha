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
        "Index readers take `given: string | Reading`, and a root reads the committed index. Some take an optional reading defaulting to the committed index, so omitting an argument reads the before state and no search finds it. Done: every check asks through `shadow.index`, `shadow.reading` is gone, and `edgesInto` and `reachingInto` take an `Answering` rather than an optional `Reading`. `shadowFor` hands the reading back beside the shadow, and a check is handed a shadow rather than a cast.",
    },
    {
      statement: "What a landing pays for a world built from the change is measured.",
      workingMemory:
        "Measured 2026-09-02. Building the world cost `lint-clean` 2.6-4.2s and `shell-clean` 3.2-3.9s copying a 77,000-file index no engine read; dropping it took both to about 10ms. An audit then spent 66,264 git spawns in the index staleness guard, memoised at bc422979b3. Typecheck ran 48.6s and 9.15 GiB cold against 19.1s and 3.10 GiB warm, once the reader stamped a content version and the build's answers were kept per root count. Bun holds 62% more than node for the same program.",
    },
    {
      statement: "A check cannot reach the index or the tree as they were before the change.",
      workingMemory:
        "Done: `edgesInto` and `reachingInto` drop their root and read a page body through `Answering.pageAt`, so both halves of a question are the change's. Shown over a world whose disk holds the base body while the reader of bodies answers the change: renaming the index a `relation` edge is read from answered one edge before and none after, and swapping that edge's attribute answered `property` before and `known` after. The old code answered off the disk in both.",
    },
  ],
  constraints: [
    "No check is weakened, skipped or disabled to make a verdict hold.",
    "A change that moves a verdict lands apart from one that cannot.",
    "Nothing outside the akasha folder is judged.",
  ],
} as const satisfies Initiative
