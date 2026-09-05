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
        "A patch carries `runsChecks` and `runsWarrants` before the first `diff --git`, each unioned over every change drafted in, and a flag is written only where false, so a line lost reads as true. Move, remove, replace and refactor draft under an agent id and land under none. Left: `retype` alone still lands, its file over the length ceiling until split; and a draft expresses no removal of a path HEAD carries no body for, so `write --remove` answers success and leaves the file.",
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
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "A patch applies only where the caller asked for an apply.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "The worktree waits until drafting works without it.",
  ],
} as const satisfies Initiative
