import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberRepairTemperTasks = {
  id: "01a06cac-aa56-7519-8281-5622fa42a987",
  type: "initiative",
  slug: "ember-repair-temper-tasks",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "A refusal from the pages names the file that refusal is about.",
      workingMemory:
        "page-calling names the status, the byte count and the parser's message. landedIn appends the paths a write had. An oversized entry value now names the file it was bound for, in entry-writing and in entry-landing. keepWhole has moved to index-keeping, which is short and carries no comment, so that blocker is gone. Left: rowsOver passes over an entry file it cannot parse without a word, so the index drops those references in silence; indexing already carries a `refused` list to name them in.",
    },
    {
      statement: "The watcher updates itself to the source revision it is told to run.",
      workingMemory:
        "The served target is b8f20f229df857590e8c51accd468fcd3f52be79, which is in neither this checkout nor the 2026-09-02 backup, so the flatten orphaned it and no fetch brings it. The watcher reads its own HEAD right, logging ve3eda7280a at 19:06:36Z. That target is version.txt baked into the watcher image at /build and copied in by temper-web's init container, so it names the commit that image was built at. The run carries on either way, so this is noise rather than an outage.",
    },
    {
      statement: "The rules a player automates are pages rather than one JSON blob.",
      workingMemory:
        "All 82 are pages under temper-inventory-rule, and the browser and the watcher read them there. What the pages carry matches the blob's 82 exactly: same ids, same order, same fingerprints, same sell block. The browser writes a changed rule as a page, takes away the page no rule wants, and writes nothing to the blob. The watcher exported 82 rules into 90,683 bytes of Lua, against 216 for an account with none. Left: the CLI, which wants @akasha/pages-access, and the 82 still in the blob.",
    },
  ],
  constraints: [
    "The watcher and the addons count as off-workstation, so they reach pages through page-service rather than by reading the repository.",
    "Supabase is used for auth and for nothing else.",
  ],
} as const satisfies Initiative
