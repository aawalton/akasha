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
        "The hold a landing takes is 48ms to 85ms where the change names one folder and about 480ms where it adds or removes a page, because `.index/page/id` held 77,208 entries in one folder and every such landing rebuilt that tree. A page's id is filed under its last two characters as well now, 256 folders of about 300. Reading and writing only that shape waits on the 52 akasha processes older than `3b97759e` turning over.",
    },

    {
      statement:
        "Whether a type generator turns is answered from the change rather than from a reading of the index.",
      workingMemory:
        "`turnsFor` in `type-generating.module.code.ts` is 465ms, down from 3.63s, almost all of it still `readByGenerated` in `type-turning.module.code.ts`. `turnedBy` answers one yes or no for the whole checkout, so any page type edit writes all 2,324 `.types.ts` bodies again rather than the ones that turned. `readByGenerated` builds `facingOn(root)`, a second face over the root, though `preparing` builds one of its own eighteen lines later.",
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
    "The checks were 5.68s of a two-minute landing and are 1.74s of a 4.78s one, so they are a third of what is left rather than a rounding error.",
    "A landing is measured from the rows beside the apply page rather than from a clock an agent reads.",
  ],
} as const satisfies Initiative
