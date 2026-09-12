import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const twoInvariantsOnAlanTrackingAreFalseWhenACallSays = {
  id: "01a095b4-f8e9-7d44-bc67-8ecc63b5badd",
  type: "question",
  slug: "two-invariants-on-alan-tracking-are-false-when-a-call-says",
  ask: "Two invariants on `alan tracking` are false when a call says `--restated`. Which goes, the flag or the statements? `--restated` is admitted by `BARE` at `commands/modules/file-arguing/file-arguing.module.code.ts:46`, and no argument page names it, so `--help` does not list it while the unknown-flag refusal does. `restatedIn` at `:52` swaps the change kind to `change-restated` through `kindNamed` at `:58`, and that kind's page sets `writerOwesReading: true` at `changes/kinds/pages/change-restated.change-kind.ts:10`, so `unwarrantedIn` at `commands/modules/warrant-owing/warrant-owing.module.code.ts:14` stops short-circuiting and `owedIn` runs. That makes `commands/pages/alan/tracking/alan-tracking.command.ts:44` — no reading is owed for a path landed here — false, and `:40` — the kind named here runs no warrant — false with it. The kind's own page disagrees with the command twice over: `change-restated.change-kind.ts:24` says a restated change is composed by an agent rather than by a program, and this command's definition at `alan-tracking.command.ts:8` says it lands what a program composed. No other command reaches `--restated` from a command line: `mechanical-filing` and `testing-system/repo-seeding` are the only other callers of `builtIn` and both compose the words they hand it, as `commands/pages/track/session/session-acting/session-acting.module.code.ts:95` does. This is a false statement on a page rather than a missing page, so writing an argument page for the flag does not settle it.",
  askedBy: "athena",
  askedIn: "01a09263-b049-757c-8bce-377d6682545a",
  status: "open",
  offered: [
    "`alan tracking` stops admitting `--restated`, as it already refuses `--break-the-glass` — then both invariants are true as written and the take-list matches `--help`",
    "`--restated` becomes an argument page this command names, and `:40` and `:44` are deleted — this command may owe a reading and may run a warrant",
    "`--restated` stays as it is and the two invariants are narrowed to the calls they are true of, as: a call naming no change kind owes no reading for a path landed here",
  ],
} as const satisfies Question
