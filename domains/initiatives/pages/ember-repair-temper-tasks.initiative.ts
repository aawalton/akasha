import type { Initiative } from "../initiative.page-type.ts"

export const emberRepairTemperTasks = {
  id: "01a06cac-aa56-7519-8281-5622fa42a987",
  pageTypeSlug: "initiative",
  slug: "ember-repair-temper-tasks",
  domainSlug: "domain/temper",
  personaSlug: "ember",
  intents: [
    {
      statement: "What the game records against a task reaches the due date the web holds.",
      workingMemory:
        "A scoped key `<taskId>:<characterId>` is kept as a mark rather than dropped, so 27 completion and 22 progress marks reach the decision. `next_character` rolls once the named character has progressed; `all_characters` once all 20 have completed or progressed, a character with no record counting as not progressed. Live at 12:42:53Z: `Task cadwell-s-almanac: rolled to 2026-09-08`, the cycle after rolling nothing, the once-a-day guard holding. Left: no per-character count reaches the web.",
    },
    {
      statement: "Every key the watcher names on a page is one that page type declares.",
      workingMemory:
        "Met: temper-task narrowed on `account`; `userId` dropped from four temper page types; `display-order`; `name` on temper-sale; `capturedAt` across the watcher and the inventory UI; `target-build-id` raised to temper-character-thing; `due-time` and `pending-sync` declared on temper-task; `handle`, `platform` and `server` declared on temper-player. Open: ten browser reads filter on `userId`, which no temper page type declares, so the store refuses each.",
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
        "Met. The enrolment states accountPage 9ba554f7-cb18-48bb-a709-ec935a895ca7, the same string alan.person states as supabaseAuthUserId, so the swap is exact. The token is a static secret read from TEMPER_WATCHER_TOKEN and hashed to the tokenHash the enrolment page holds. Nothing mints one, nothing refreshes one, and the page type declares no expiry, so the check compares digests rather than a clock. A token matching nothing crash-loops the unit every five seconds.",
    },
    {
      statement: "The watcher updates itself to the source revision it is told to run.",
      workingMemory:
        "The served target is b8f20f229df857590e8c51accd468fcd3f52be79, which is in neither this checkout nor the 2026-09-02 backup, so the flatten orphaned it and no fetch brings it. The watcher reads its own HEAD right, logging ve3eda7280a at 19:06:36Z. That target is version.txt baked into the watcher image at /build and copied in by temper-web's init container, so it names the commit that image was built at. The run carries on either way, so this is noise rather than an outage.",
    },
    {
      statement: "The rules a player automates are pages rather than one JSON blob.",
      workingMemory:
        "All 82 are pages under temper-inventory-rule, and the browser and the watcher read them there. What the pages carry matches the blob's 82 exactly: same ids, same order, same fingerprints, same sell block. The browser writes a changed rule as a page, takes away the page no rule wants, and writes nothing to the blob. The watcher exported 82 rules into 90,683 bytes of Lua, against 216 for an account holding none. Left: the CLI, which wants @akasha/pages-access, and the 82 still in the blob.",
    },
    {
      statement: "A player's settings are read from the file beside that player's page.",
      workingMemory:
        "Met on the watcher and the browser. The watcher reads the body over readPages and readFiles and names all four under `settings to export`. The browser asks under `files` and reads 42,744 chars keyed safety, logging, inventory, automation, against `json` without it. Five panels share one copy, and a write landing before that read is refused. composedFor refuses the raw object and lands the ending plus `bodies` beside the page. Left: the CLI.",
    },
    {
      statement: "The browser reads and writes the file beside a page.",
      workingMemory:
        "Met. A query names `files`, camelized like `keys`; pages-access carries `bodies` through upsert. The import and the display both narrow on the keys the types declare, and the completion tabs ask for their own bodies: 20 characters at 5,535,571 chars and one account at 1,963,567, against 20 endings and 1 on the same query without `files`. A listing stays at about 1,300 bytes. A path road was refused: the store limits no caller. No companion carries a completion at all.",
    },
  ],
  constraints: [
    "The watcher and the addons count as off-workstation, so they reach pages through pages-service rather than by reading the repository.",
    "Supabase is used for auth and for nothing else.",
  ],
} as const satisfies Initiative
