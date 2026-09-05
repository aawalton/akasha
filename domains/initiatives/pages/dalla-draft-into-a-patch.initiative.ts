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
        "`rebasedOnto` follows a path gone from HEAD to the path a rename left it at, hop by hop, by `git log --diff-filter=D` and `git diff-tree -M`. It answers under the path the rename reached, so `showing` lists and marks from `said.held` rather than the stored file. A path taken away by no rename is carried in as a conflict `markedAway` builds, so `patch resolve` acts on it and every other path still applies. Left: no act takes one path out of a patch, so accepting a deletion drops the whole patch.",
    },
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "Standard input carries a body now, so no scratch file is needed. A change accumulates across calls: `folded` merges each draft onto what the patch already holds, so a new page and its parent's part-slugs no longer have to land in one call. What is left is taking the file flags and the repeating pairs away.",
    },
    {
      statement: "Every change command drafts into the patch rather than landing on its own.",
      workingMemory:
        "Built. `landedMechanically` drafts where the caller names an agent id and lands where it names none, so the fifteen programs are untouched. A patch says it is mechanical in a line before the first `diff --git`; git reads past a preamble, and `blobsIn` answers only to diff headers. No line means authored, so a stripped line reads the safe way. An authored draft, a resolve, or a patch taken in from an authored one flips it. `applied()` takes carries and hands them to the landing now, so routing the three no longer drops their beside-file renames silently. Left: the routing itself, which Alan times, because it changes what an agent typing one of the three gets back.",
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
