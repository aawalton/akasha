import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "domain/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "The glass is broken only where a patch applies.",
      workingMemory:
        "`patch apply` takes `--break-the-glass` already. What is left is taking it off `write` and `edit`, which still name `BREAK_GLASS` in `VALUED` and still build a `Bypass` from it. Breaking the glass at a draft buys nothing, because a draft lands nothing, and the checks that matter run where the patch applies. Wait for the suites to come onto the drafting contract before touching those two files again.",
    },
    {
      statement: "A rename landing under an open patch leaves that patch coherent.",
      workingMemory:
        "Drafting as the default makes this urgent, because every agent will hold an open patch and a rename lands under many at once. `rebasedOnto` reads `bodyAt(root, head, path)` for each path a patch holds, and a path renamed away reads as nothing, so the merge sees theirs taken away against ours changed. The patch keeps the body at the dead path and applying would put that file back there. Read off the code rather than run.",
    },
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "Standard input carries a body now, so no scratch file is needed. A change accumulates across calls: `folded` merges each draft onto what the patch already holds, so a new page and its parent's part-slugs no longer have to land in one call. What is left is taking the file flags and the repeating pairs away.",
    },
    {
      statement: "A mechanical change goes through a patch and applies it in the same call.",
      workingMemory:
        "Alan settled this shape: mechanical commands work through patches as authored ones do, applying rather than drafting. Change kinds are live: `calling` reads `changeKindSlug` off the command page and hands a `Kind` carrying `runsChecks` and `runsWarrants` read off the kind page. A mechanical command gets NO_GATE and stamps `Checks-bypassed:` on the commit. 50 commands name that kind, among them `move`, `refactor` and `remove`, which agents type. None goes through a patch.",
    },
    { statement: "A seat and its subagents draft against one worktree of their own." },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "A patch is a file committed beside its agent's page rather than a page.",
    "A patch and its conflicts are stored in the formats git already reads.",
    "A draft is an authored change.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "The worktree waits until drafting works without it.",
  ],
} as const satisfies Initiative
