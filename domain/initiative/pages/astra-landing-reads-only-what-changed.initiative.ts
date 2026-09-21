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
        "A page's id is filed under its last two characters and nowhere else, so `.index/page/id` is 256 folders of about 300 entries rather than one of 77,326, and git tracks 383,122 files rather than 460,339. The hold is 50.4ms on a landing that adds a page, and a one-line edit to one page is 4.12s end to end, 0.11s the change and 3.82s the apply, which is mostly child processes. `filedAt` in `index-surface.module.code.ts` is the one place that path is worked out, so reader, writer and fixtures agree.",
    },

    {
      statement:
        "Whether a type generator turns is answered from the change rather than from a reading of the index.",
      workingMemory:
        "`turnsFor` in `type-generating.module.code.ts` is 465ms, almost all of it `readByGenerated` in `type-turning.module.code.ts`. `turnedBy` answers one yes or no for the whole checkout, so any page type edit writes all 2,324 `.types.ts` bodies again rather than the ones that turned. `readByGenerated` builds `facingOn(root)`, a second face over the root, though `preparing` builds one of its own eighteen lines later.",
    },
    {
      statement:
        "What a property carries is worked out for the pages a change names rather than across the index.",
      workingMemory:
        "Whether a path is generated is answered for the section asked rather than by building the whole table: 28 sections say `generated`, 5 name a writing group, 3 name a file exactly and 7 name a folder. A folder property is reached by the name a path carries, a face asks which page types carry a property rather than gathering every page to learn them, and one face is held per root. `kindedIn` still parses every property page where the shapes file for each property type would answer in one read.",
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
        "Spawning `git cat-file --batch` is not the cost in `commit-reading.module.code.ts`: each spawn is about a millisecond. The landing ends the reading in `judged` and again before it writes, and the tree cache used to go with it. A tree under a commit never changes, so trees are held under the commit a reader resolved rather than by the reader, which is 1.8% of a landing in the profile.",
    },
    {
      statement: "A change is typechecked in a program built from the files that change reaches.",
      workingMemory:
        "The program a change is judged in holds the files that change reaches and nothing else, so `program-naming` is gone and no check here reads `shadow.listed()`. Naming all 275 declarations cost 2.5s of processor a landing, four times what a compile off disk said, because the compiler is served through a virtual filesystem where every file is a callback. A file names the declarations its own declarations reach, and `skipLibCheck` is true for a change and false for the audit.",
    },
    {
      statement:
        "An apply spends its own processor on the change rather than on reading the checkout.",
      workingMemory:
        "An apply of one path is 1.1s of wall and 1.6s of processor, from 3.81s and 7.38s. The forty-six checks are 0.32s of wall of it, and typecheck at 0.40s of processor is the only one above 0.09s. The stylesheet gate reads the stylesheets out of the index rather than spawning git, one reading of the index answers every warrant a call runs, and a change is cast from a reading held for the commit that change starts from.",
    },
  ],
  constraints: [
    "A file already carrying what would be written again is left alone: `keepDelta`, `reconcile` and `wholeInto` each compare before writing, and the profile bears that out.",
    "The checks are most of what an apply spends, so a check reading the whole tree to judge one file is the thing to find.",
    "A landing is measured from the rows beside the apply page rather than from a clock an agent reads.",
    "Nothing the typecheck a change runs reads or names scales with the repository rather than with the files that change names.",
    "A check wanting what a handful of pages say asks the index for those pages rather than for every page.",
  ],
} as const satisfies Initiative
