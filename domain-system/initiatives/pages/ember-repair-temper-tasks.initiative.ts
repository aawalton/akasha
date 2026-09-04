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
      statement: "The completion the game reports reaches the file beside the account page.",
      workingMemory:
        "upsertPage carries no file body in either direction, by design: page-composing states that a value under a file-property key names that file's ending, and getPage on `completion` answers the four characters `json`. So import-completion merged against nothing and the write refused. A guard now refuses that value before the write and says why. Whether upsertPage should carry file bodies, or the watcher should write the side file itself, is Alan's to settle.",
    },
    {
      statement: "Reading one page costs bytes in proportion to that page.",
      workingMemory:
        "The narrow is pushed and honoured, and saves 656 bytes of 429,204,036, because 161 of the 162 snapshots are one account's. A projection saves the rest: the same ask carrying keys answers 22,528 bytes. The whole-population fetch is deliberate, since a cursor pages over one sorted snapshot, so leave that alone. The body parses at 2,388 MB resident and is killed outright under a 900M cap, so the field failure was allocation rather than syntax.",
    },
    {
      statement: "A refusal from the pages names the file that refusal is about.",
      workingMemory:
        "page-calling now names the status, the byte count and the parser's own message on a body it cannot read. landedIn now appends the paths a write carried. The entry that could not be opened is still unnamed, because keepWhole sits in indexing.module.code.ts, which is 15,810 bytes against a 15,000 ceiling and carries comments the no-code-comments check refuses, so any edit there trips every one of them at once. That file wants a length remediation first.",
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
