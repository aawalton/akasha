import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "domain/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "A rename landing under an open patch leaves that patch coherent.",
      workingMemory:
        "What was read off the code was wrong. The merge did not keep the body at the dead path: `mergedOnto` saw theirs as nothing and refused, and `rebasedOnto` handed that refusal to every caller, so draft, resolve and apply all refused alike and a rename bricked a patch that only `patch drop` got out of. `rebasedOnto` now follows a path gone from HEAD to the path a rename left it at, hop by hop for a chain, reading `git log --diff-filter=D` for the commit that took the path away and `git diff-tree -M` for the pair. What is left: `patch` lists the paths the stored patch file carries rather than the paths the rebase reaches, so a bare `akasha patch` names the dead path until the next draft rewrites the file; and a path deleted rather than renamed still refuses with no way to resolve.",
    },
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "Standard input carries a body now, so no scratch file is needed. A change accumulates across calls: `folded` merges each draft onto what the patch already holds, so a new page and its parent's part-slugs no longer have to land in one call. What is left is taking the file flags and the repeating pairs away.",
    },
    {
      statement: "Every change command drafts into the patch rather than landing on its own.",
      workingMemory:
        "Alan settled this shape in place of the auto-applying one, which carried a hazard: a mechanical change routed through the agent's patch handed `applied()` a NO_GATE and applied the patch whole, so an agent's open authored drafts would have landed unjudged. Now nothing applies but an apply the caller asked for, `move`, `refactor` and `remove` included. The patch carries `mechanical`, true when the patch is opened. An authored draft flips it false, and so does a `patch resolve`, because a resolved body is bytes the caller chose. An apply over a patch still mechanical runs no check and stamps why; over one flipped false it runs the checks. Not settled: whether a caller may call a change mechanical on the call, which is the check bypass taken off the glass, so until Alan says, mechanical is what the command's page declares. Open too: whether a mechanical patch skips warrants as well as checks. `applied()` hands `[]` for carries, so `move` and `refactor` need a carries parameter on it before they route or their beside-file renames go silently. About fifteen callers run under no agent id, hold no patch, and keep the direct landing.",
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
    "A patch is mechanical until an authored change or a resolve flips it.",
    "A patch applies only where the caller asked for an apply.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "The worktree waits until drafting works without it.",
  ],
} as const satisfies Initiative
