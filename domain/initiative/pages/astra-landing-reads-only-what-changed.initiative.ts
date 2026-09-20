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
        "`readingIn` built a new reading for every caller that named the root rather than a reading, so every `heldOnce` and `heldEach` memo missed and each face over the root was worked out again. One reading is held per root for the length of a command call now, and a write to the index lets it go. What that leaves of `derivedFor`, `carryingOf` and `turnsFor` is not yet measured.",
    },
    {
      statement: "The stylesheet sources a landing gathers are the ones its change names.",
      workingMemory:
        "`globbedFor` was 2.34s of a 7.86s landing whenever a change added or took away a file of code, because the gate opened on any specifier moving anywhere and then followed every import the app has. The paths each app reaches are kept beside its stylesheet now, so the gate opens only where a manifest, a stylesheet or a path on that list moved. The lists hold 9,582 paths over twelve stylesheets, and the gate is 89.7ms against the 1.84s that filled them.",
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
