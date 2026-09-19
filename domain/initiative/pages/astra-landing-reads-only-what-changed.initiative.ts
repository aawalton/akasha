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
        "A landing over one finding page is 10,674ms, run `01a0babb-739a-7000-b417-5de73eaff513`, down from 15,984ms once the editor's pictures were gated. What is left is read whole on every landing whatever the change names, each reading sized by the repository rather than by the change. The checkout holds 380,845 tracked files, 153,856 of them under `.index`.",
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
        "`facingIn` with `carryingOf` and `derivedFor` in `property-carrying.module.code.ts` is 4.29s. `statSync` is 10.8% of the landing on its own, every call from `markOf` in `index-surface.module.code.ts`, which stats each index file to judge whether what it holds is fresh.",
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
        "`bodyAt` in `commit-reading.module.code.ts` is 3.58s, and the pair `filled` with `readSync` is the hottest thing in the profile at 13.5%. The 451,892 write calls a landing records are not files written: `writeFileSync` is 4.1ms over the whole run, and the native `write` is called by `asked`, which puts one query down the `git cat-file --batch` pipe. `syscw` counts a pipe write the same as a file write.",
    },
  ],
  constraints: [
    "A file already carrying what would be written again is left alone: `keepDelta`, `reconcile` and `wholeInto` each compare before writing, and the profile bears that out.",
    "The checks are not the cost. All 48 of them together were 5.68s of wall clock in run `01a0ba46-a295`.",
    "A landing is measured from the rows beside the apply page rather than from a clock an agent reads.",
  ],
} as const satisfies Initiative
