import type { Initiative } from "../initiative.page-type.ts"

export const emberRepairTemperTasks = {
  id: "01a06cac-aa56-7519-8281-5622fa42a987",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "ember-repair-temper-tasks",
  domain: "domain/temper",
  persona: "ember",
  intents: [
    {
      statement: "Every key the watcher names on a page is one that page type declares.",
      workingMemory:
        'The reads are done: the ten that filtered on `userId` name `accountPage`, and no `key: "userId"` is left in temper. The writes are not: every create sends `userId`, `buildName` and `buildMetadata`, which neither build page type declares, and about twenty browser readers take `build.buildMetadata` or `build.userId`, which read empty. Write title, description, roles, targetCount and accountPage instead. No build page has an accountPage yet.',
    },
    {
      statement: "Reading one page costs bytes in proportion to that page.",
      workingMemory:
        "The narrow is pushed and honoured, and saves 656 bytes of 429,204,036, because 161 of the 162 snapshots are one account's. A projection saves the rest: the same ask with keys answers 22,528 bytes. The whole-population fetch is deliberate, since a cursor pages over one sorted snapshot, so leave that alone. The body parses at 2,388 MB resident and is killed outright under a 900M cap, so the field failure was allocation rather than syntax.",
    },
    {
      statement: "A refusal from the pages names the file that refusal is about.",
      workingMemory:
        "page-calling now names the status, the byte count and the parser's own message on a body it cannot read. landedIn now appends the paths a write had. The file-property guard names the page type, the character count, the opening of the body and the 255-byte ceiling. The entry that could not be opened is still unnamed, because keepWhole sits in indexing.module.code.ts, which is 15,810 bytes against a 15,000 ceiling and has comments the no-code-comments check refuses.",
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
    "The watcher and the addons count as off-workstation, so they reach pages through pages-service rather than by reading the repository.",
    "Supabase is used for auth and for nothing else.",
  ],
} as const satisfies Initiative
