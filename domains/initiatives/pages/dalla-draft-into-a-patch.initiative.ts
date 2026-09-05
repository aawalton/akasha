import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "domain/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "Marker blocks on standard input carry several passages into one file, and one file a call, since one input serves one `--file-path`; several files take several calls, which the patch absorbs by folding each draft onto what it holds. A payload names a run of its own to carry a passage holding a marker line, so `--content-file` is no longer the only way in. A marker saying `mid-line` ends a passage before its last newline. Left: taking the flags away.",
    },
    {
      statement: "Every change command drafts into the patch rather than landing on its own.",
      workingMemory:
        "Built. `landedMechanically` drafts where the caller names an agent id and lands where it names none, so the fifteen programs are untouched. A patch says it is mechanical in a line before the first `diff --git`; git reads past a preamble, and `blobsIn` answers only to diff headers. No line means authored, so a stripped line reads the safe way. An authored draft, a resolve, or a patch taken in from an authored one flips it. `applied()` takes carries and hands them to the landing now, so routing the three no longer drops their beside-file renames silently. Left: the routing itself, which Alan times, because it changes what an agent typing one of the three gets back.",
    },
    {
      statement: "A seat and its subagents draft against one worktree of their own.",
      workingMemory:
        "Held by the constraint that the worktree waits until drafting works without it. Not begun, and it waits on the intents above.",
    },
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
