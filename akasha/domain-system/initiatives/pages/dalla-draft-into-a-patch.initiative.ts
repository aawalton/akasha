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
        "Standard input carries the body. Write takes one body; edit takes old and new between conflict markers, line-oriented, the trailing newline included. The file flags and the repeating pairs stay until patches land, since a new page and its parent's part-slugs must still land in one call. The invariant naming --content-file is restated to name standard input rather than deleted, because keeping bodies out of argv is the point.",
    },
    { statement: "A seat and a subagent each carry the patch they are drafting." },
    { statement: "A drafted change is worked into the agent's patch and rebased onto main." },
    {
      statement: "A patch that cannot rebase carries its conflicts where the agent resolves them.",
    },
    { statement: "A draft says what the checks would refuse and refuses nothing." },
    { statement: "An applied patch lands through the gate as one commit." },
    { statement: "A drafting command takes no dry run flag." },
    { statement: "The glass is broken only where a patch applies." },
    { statement: "A rename landing under an open patch leaves that patch coherent." },
    { statement: "A seat and its subagents draft against one worktree of their own." },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "A patch is uncommitted state on the seat and the subagent rather than a page.",
    "A patch and its conflicts are stored in the formats git already reads.",
    "Alan settles each block's shape before it lands.",
    "The worktree waits until drafting works without it.",
  ],
} as const satisfies Initiative
