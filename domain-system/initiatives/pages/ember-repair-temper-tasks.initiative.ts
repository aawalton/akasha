import type { Initiative } from "../initiative.page-type.ts"

export const emberRepairTemperTasks = {
  id: "01a06cac-aa56-7519-8281-5622fa42a987",
  pageTypeSlug: "initiative",
  slug: "ember-repair-temper-tasks",
  domainSlug: "domain/temper",
  personaSlug: "ember",
  intents: [
    {
      statement: "Every key the watcher names on a page is one that page type declares.",
      workingMemory:
        "Met: temper-task narrowed on `account`; `userId` set on four temper page types; `sortOrder` where temper states `display-order`; `itemName` where temper-sale states `name`. Open: settings-equipment reads `targetBuildId` off temper-companion-progress, export-tasks reads `pgId` and `dueTime` off temper-task, settings-consumables orders by `dataTimestamp`. None of the four is declared. A query naming one throws, a property access on one reads undefined, so half the class is silent.",
    },
    {
      statement: "A task the web holds reaches the characters config the game reads.",
      workingMemory:
        "The characters dispatch runs characters, then completion, then tasks, then the characters config, and stops at the first failure, which is why one fault hid the next. It reaches completion now and stops there on the file-property write.",
    },
    {
      statement: "A page carrying a file property of any size is written rather than refused.",
      workingMemory:
        "upsertPage on temper-account with its 1.46 MB completion refuses with `ENAMETOOLONG: name too long, open`, naming no path. The throw is below file-write:251, which only relays it, and the write travels over the service to page-writing. Delegated.",
    },
    {
      statement: "Reading one page costs bytes in proportion to that page.",
      workingMemory:
        "The narrow is pushed and honoured, and saves 656 bytes of 429,204,036, because 161 of the 162 snapshots are one account's. A projection saves the rest: the same ask carrying keys answers 22,528 bytes. The whole-population fetch is deliberate, since a cursor pages over one sorted snapshot, so leave that alone. The body parses at 2,388 MB resident and is killed outright under a 900M cap, so the field failure was allocation rather than syntax.",
    },
    {
      statement: "A refusal from the pages names the file that refusal is about.",
      workingMemory:
        "page-calling now answers a body it cannot read as a refusal naming the status, the byte count and the parser's own message, and it no longer retries such a body. The ENAMETOOLONG refusal still names no path.",
    },
    {
      statement: "The watcher proves who it is by its enrolment token alone.",
      workingMemory:
        "The enrolment states accountPage 9ba554f7-cb18-48bb-a709-ec935a895ca7, the same string alan.person states as supabaseAuthUserId, so the swap is exact. The session is valid today. Once its refresh token expires the fallback is a browser sign-in a daemon cannot complete.",
    },
    {
      statement: "The watcher updates itself to the source revision it is told to run.",
      workingMemory:
        "Every start logs `Source update to b8f20f22 not applied (target-not-fetched)`. Untouched so far.",
    },
  ],
  constraints: [
    "The watcher and the addons count as off-workstation, so they reach pages through pages-system-service rather than by reading the repository.",
    "Supabase is used for auth and for nothing else.",
  ],
} as const satisfies Initiative
