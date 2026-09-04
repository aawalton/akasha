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
    { statement: "A draft says what the checks would refuse and refuses nothing." },
    { statement: "A drafting command takes no dry run flag." },
    { statement: "The glass is broken only where a patch applies." },
    { statement: "Drafting is what write and edit do when nothing says otherwise." },
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "Standard input carries a body now, so no scratch file is needed. What is left is taking the file flags and the repeating pairs away, and that waits on the patch: until a change accumulates, a new page and its parent's part-slugs must still land in one call.",
    },
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
    "A draft is an authored change.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "The worktree waits until drafting works without it.",
  ],
} as const satisfies Initiative
