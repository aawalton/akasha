import type { Finding } from "../finding.page-type.ts"

export const twoUnimportedModulesStillTellAReaderToRunOpsRead = {
  id: "01a0614b-dae8-7e42-b010-b3448076a915",
  pageTypeSlug: "finding",
  slug: "two-unimported-modules-still-tell-a-reader-to-run-ops-read",
  domainSlug: "domain/akasha-migration",
  claim:
    "There is no `ops read`. Three live sites in the checkout told a reader to run it, and the read that records a reading is `akasha read`. One of the three was `ops search --help`, which is help Alan reads, and it is fixed. The other two sit in modules nothing imports, so they are dead text naming a dead command — a deletion rather than an edit, but the reach was not measured far enough here to take it.",
  evidence:
    'Listing `commandSet()` gives 311 commands and none is `read`; the nearest are `imessage unread-list` and `seat turn-end read`. The live command is `akasha read`, whose code is `akasha/command-system/command/read/read.command.code.ts` and whose `ANSWER_CEILING` of 28000 is the cap an answer is held to. `tools/compose-boot.ts:68` already spells `SEAT_READ = "akasha read --file-path"`.\n\nThe three sites naming `ops read`: `agent/search-help.ts:39`, inside the help `ops search` renders, now `akasha read --file-path <path>`; `agent/read-answer.ts:4`, `const READ_COMMAND = "ops read"`, used by `restCall` to print the call that takes what an answer would not hold; and `tools/lib/owed.ts:28`, inside `loadingLines`, printing the one call that loads every file a run left owed.\n\nGrepping the checkout for `read-answer` and for `loadingLines` outside `node_modules` and `dist/` finds no importer of either, and `agent/read-answer.ts` restates a ceiling and a rest-call that `read.command.code.ts` already carries.\n\nThe call taken: the one site a reader meets is corrected. The two unimported ones are named here rather than deleted, because `tools/lib/owed.ts` exports more than `loadingLines` and what else reaches it was not measured.',
} as const satisfies Finding
