import type { Initiative } from "../initiative.page-type.ts"

export const pageFoldersByIndex = {
  id: "01a0823b-74ce-744f-a860-1dc482cbd1c9",
  pageTypeSlug: "initiative",
  slug: "page-folders-by-index",
  domainSlug: "workspace-package/page",
  personaSlug: "amy",
  constraints: ["Start this only once the day model is one page type."],
  intents: [
    {
      statement:
        "Code reaching the pages of a type asks the index for them rather than spelling their folder.",
      workingMemory:
        '48 files hold a constant such as `"seat-system/seats/pages"` and then read that folder off disk. `listedAt` and `listedWithin` under `pages/indexes/reading` answer by page type slug already, so each of those constants re-derives what the index holds. `move-folder` repoints an import and leaves a path spelled as text, which is how carrying `alan/tracking` to `alan/track` left twelve files reaching a folder that was gone.',
    },
    {
      statement:
        "A check refuses a path spelled as text where the index answers what that path reaches.",
      workingMemory:
        "Nothing refuses one yet. A workstation-service spells a path to a module's code file inside the shell command line it runs, and one of those runs no module at all, so the rule either admits that shape or the `runs` lines become a question of their own.",
    },
  ],
} as const satisfies Initiative
