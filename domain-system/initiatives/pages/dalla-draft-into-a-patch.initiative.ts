import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "domain/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "A principal takes in the patch of a subagent that stops.",
      workingMemory:
        "Taking one in is the same three-way merge a draft is: HEAD is the base, the principal's patch is ours, the subagent's is theirs, and what conflicts lands in the principal's conflicts. The patch also keeps the agent ids it has taken in, cleared when it applies or is dropped, so the warrant refusing the next draft can say why reads are owed on files the principal never touched.",
    },
    { statement: "A drafting command takes no dry run flag." },
    { statement: "The glass is broken only where a patch applies." },
    {
      statement: "Drafting is what write and edit do when nothing says otherwise.",
      workingMemory:
        "The blocker is gone: a draft says what the checks refused and keeps the change either way, so flipping the default no longer wedges an agent whose patch holds a half-finished state. What is left is the flag. `landingAsked` forks on `held.draft === true` at one line, and `write` and `edit` each declare `--draft` in `taking` and in `BARE`. The glass intent lands with this one: once every authored change goes through a patch, `--break-the-glass` belongs on `patch apply` alone.",
    },
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "Standard input carries a body now, so no scratch file is needed. A change accumulates across calls: `folded` merges each draft onto what the patch already holds, so a new page and its parent's part-slugs no longer have to land in one call. What is left is taking the file flags and the repeating pairs away.",
    },
    { statement: "A rename landing under an open patch leaves that patch coherent." },
    { statement: "A seat and its subagents draft against one worktree of their own." },
    {
      statement: "A mechanical change goes through a patch and applies it in the same call.",
      workingMemory:
        "Alan settled this shape: mechanical commands work through patches as authored ones do, applying rather than drafting. Change kinds are live: `calling` reads `changeKindSlug` off the command page and hands a `Kind` carrying `runsChecks` and `runsWarrants` read off the kind page. A mechanical command gets NO_GATE and stamps `Checks-bypassed:` on the commit. 50 commands name that kind, among them `move`, `refactor` and `remove`, which agents type. None goes through a patch.",
    },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "A patch is uncommitted state on the seat and the subagent rather than a page.",
    "A patch and its conflicts are stored in the formats git already reads.",
    "A draft is an authored change.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "The worktree waits until drafting works without it.",
  ],
} as const satisfies Initiative
