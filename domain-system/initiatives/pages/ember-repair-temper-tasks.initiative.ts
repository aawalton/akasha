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
        "Met: temper-task narrowed on `account`; `userId` dropped from four temper page types; `display-order`; `name` on temper-sale; `capturedAt` across the watcher and the inventory UI; `target-build-id` raised to temper-character-thing, which both carriers extend; `due-time` and `pending-sync` declared on temper-task. Open: temper-player declares neither `handle` nor `profileMetadata`, and whether that profile is a feature or residue is Alan's to settle.",
    },
    {
      statement: "A task the web holds reaches the characters config the game reads.",
      workingMemory:
        "Met at 15:31:53Z: `characters synced, completion synced, tasks synced, charactersConfig synced`. TemperCharactersConfig.lua is 13,412 bytes over 386 lines and names 14 tasks. The dispatch runs characters, then completion, then tasks, then the config, and stops at the first failure, which is why one fault hid the next for so long.",
    },
    {
      statement: "The completion the game reports reaches the file beside the account page.",
      workingMemory:
        "Met. upsertPage carries no file body either way, by design: a value under a file-property key names that file's ending, and getPage on `completion` answers the four characters `json`. import-completion takes each page path from readPages, swaps the trailing `.ts` for `.completion.json`, reads with readFiles and lands with writeFiles. Commits ac1e875a3f and 81523f727d carried 21 files, and the forward merge had something to merge against at last: 19 of 20 characters kept fields the save had lost.",
    },
    {
      statement: "The watcher reaches every page over the service rather than over the checkout.",
      workingMemory:
        "Met on both roads. readFiles and writeFiles post to /read and /write. upsertPage and getPages read as a file road from their names alone, but pages-access/file-write imports the service's asking, reading and writing clients, so they take the same hop: a refusal at 15:21:53Z named four attempts on http://page-store.page-store.svc.cluster.local:8787/ask. What writesOverServer() picks is which client answers, not whether one is reached.",
    },
    {
      statement: "Reading one page costs bytes in proportion to that page.",
      workingMemory:
        "The narrow is pushed and honoured, and saves 656 bytes of 429,204,036, because 161 of the 162 snapshots are one account's. A projection saves the rest: the same ask carrying keys answers 22,528 bytes. The whole-population fetch is deliberate, since a cursor pages over one sorted snapshot, so leave that alone. The body parses at 2,388 MB resident and is killed outright under a 900M cap, so the field failure was allocation rather than syntax.",
    },
    {
      statement: "A refusal from the pages names the file that refusal is about.",
      workingMemory:
        "page-calling now names the status, the byte count and the parser's own message on a body it cannot read. landedIn now appends the paths a write carried. The file-property guard names the page type, the character count, the opening of the body and the 255-byte ceiling. The entry that could not be opened is still unnamed, because keepWhole sits in indexing.module.code.ts, which is 15,810 bytes against a 15,000 ceiling and carries comments the no-code-comments check refuses.",
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
