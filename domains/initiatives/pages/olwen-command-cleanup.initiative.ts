import type { Initiative } from "../initiative.page-type.ts"

export const olwenCommandCleanup = {
  id: "01a06d80-f837-7845-8ef8-bfccd653aab4",
  pageTypeSlug: "initiative",
  slug: "olwen-command-cleanup",
  domainSlug: "workspace-package/command-system",
  personaSlug: "olwen",
  constraints: [
    "The folder is named `commands/` and the package `@akasha/commands`, while the workspace package page beside the command page type is slugged `command`, as `domains/` is.",
    "A page keeps the qualifier its slug carries and sits in a folder named without it, as `purpose/` holds `domain-purpose`. Alan settled this.",
    "A page beside the command page type is a part of the package holding its folder, as the move reads a parent from the folder alone.",
  ],
  intents: [
    {
      statement: "All command files are organized in the commands/ folder.",
      workingMemory:
        "`command-system/` holds 162 files and `commands/` holds 244, and neither folder holds a page naming itself. 609 files carry 882 spellings of `@akasha/command-system`, and 152 files outside reach in by a relative path. Nothing claims `workspace-package/command`, and the command page type already states `commands` as its plural.",
    },
    {
      statement: "The commands/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "The check refuses once: `commands/` matches no shape because it holds no page of its own. That clears when `command.page-type.ts` and `command.workspace-package.ts` sit at that folder's root as a pair, the shape `domains/` took. `command-system/` refuses nothing across its 162 files.",
    },
  ],
} as const satisfies Initiative
