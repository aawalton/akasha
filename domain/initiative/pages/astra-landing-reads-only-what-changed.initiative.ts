import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraLandingReadsOnlyWhatChanged = {
  id: "01a0ba6f-3720-70b6-9d51-234066d336dc",
  type: "page-type/initiative",
  slug: "astra-landing-reads-only-what-changed",
  domain: "page-type/command",
  persona: "persona/astra",
  intentStack: [
    {
      statement: "A landing reads only what the paths its change names reach.",
      workingMemory:
        "A landing is 4.78s of work, profiled, and the lock it holds while writing is 514ms on average and 740ms at worst, watched over two minutes. That lock is busy 2.6% of the wall, so it costs a landing little today, and it is the piece that has to be under 100ms. Every akasha call loaded the TypeScript compiler until `6794112d` and is 0.04s rather than 0.15s now. The checkout holds 380,845 tracked files, 153,856 of them under `.index`.",
    },

    {
      statement:
        "Whether a type generator turns is answered from the change rather than from a reading of the index.",
      workingMemory:
        "`turnsFor` in `type-generating.module.code.ts` is 3.63s, almost all of it `readByGenerated` in `type-turning.module.code.ts`. `turnedBy` answers one yes or no for the whole checkout, so any page type edit writes all 2,324 `.types.ts` bodies again rather than the ones that turned.",
    },
    {
      statement:
        "What a property carries is worked out for the pages a change names rather than across the index.",
      workingMemory:
        "`filePropertiesAt` in `index-entries.module.code.ts` was 1.29s of a 6.20s landing: `carryingAt` was worked out again on each of 1,207 calls, 1,166 of them from `fileOf`, though it reads one reading alone. It is held with `heldOnce` now, as this page type's own decision says. What is left of `derivedFor` is `slugsOver` at 1.25s, reading every file property whatever the change names, and `readByGenerated` building a second face over the root.",
    },
    {
      statement: "The stylesheet sources a landing gathers are the ones its change names.",
      workingMemory:
        "`globbedFor` in `source-globbing.module.code.ts` was 2.87s of a landing whose change named one finding page and no stylesheet. It now gathers nothing where every specifier and every file of code remains as it was, which is most landings. What is left is the landing that does move a specifier, which still walks every file the app reaches.",
    },
    {
      statement:
        "A landing asks git for the bodies its change names rather than for hundreds of thousands.",
      workingMemory:
        "`bodyAt` in `commit-reading.module.code.ts` is 365ms now, down from 3.58s. The write calls a landing records are not files written: `writeFileSync` is 4.1ms over a whole run, and the native `write` is called by `asked`, which puts one query down the `git cat-file --batch` pipe, so `syscw` counts a pipe write the same as a file write. That batch process is spawned three times in a landing rather than once, because `readingEnded` closes it at the end of each reader.",
    },
  ],
  constraints: [
    "A file already carrying what would be written again is left alone: `keepDelta`, `reconcile` and `wholeInto` each compare before writing, and the profile bears that out.",
    "The checks are not the cost. All 48 of them together were 5.68s of wall clock in run `01a0ba46-a295`.",
    "A landing is measured from the rows beside the apply page rather than from a clock an agent reads.",
  ],
} as const satisfies Initiative
