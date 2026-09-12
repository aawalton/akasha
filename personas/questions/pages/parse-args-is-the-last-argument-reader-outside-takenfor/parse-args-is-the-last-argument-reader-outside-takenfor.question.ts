import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const parseArgsIsTheLastArgumentReaderOutsideTakenfor = {
  id: "01a095c0-657e-7f96-83fc-ca06402e3ba1",
  type: "question",
  slug: "parse-args-is-the-last-argument-reader-outside-takenfor",
  ask: '`parse-args` is the last argument reader outside `takenFor`. Should it be retired? One file in the repository imports it: `seat-system/seat-resume/seat-resume.module.code.ts`. Nothing else does, so retiring it is one file\'s worth of work and no other caller moves. What that one caller reads is a handshake the command page deliberately does not name. Alan\'s `sr` is composed on demand rather than written down, and where the seat it names is not already live it reaches the resume module through the shell at `shell/terminal/terminal-seat-launchers/terminal-seat-launchers.module.code.ts:251`, which runs the module with `--start-mode interactive --no-launch`. That last flag is read at `seat-resume.module.code.ts:407`, where `launch` is set from its absence. No argument page names `--no-launch`, and the command page says why that is right rather than an oversight: `commands/pages/seat/resume/seat-resume.command.ts:13` states that a flag this page does not name is refused though the module beneath takes it. So the module takes a flag the page above it refuses, and `sr` is the only caller that says it. Two things narrow the question. The shell does not always reach the module at all — `terminal-seat-launchers.module.code.ts:239` attaches to a live tmux session and returns, so the handshake runs only where the seat is not live or has no page. And the one capability this reader was thought to hold alone, folding a positional word onto a flag, `takenFor` already expresses: the same command page names its seat as a word at `seat-resume.command.ts:42`, `{ argument: "argument/seat", required: true, saidAs: "word" }`. What is genuinely at stake is not a reader that cannot be replaced but a flag read by a module and refused by the page above it, and `sr` changes what it runs if that arrangement goes with nothing taking its place.',
  askedBy: "athena",
  askedIn: "01a09263-b049-757c-8bce-377d6682545a",
  status: "open",
  offered: [
    "`--no-launch` becomes an argument page `seat resume` names, `parse-args` goes, and the module is read by `takenFor` like every other — the flag then shows in `--help`, which is what `:13` exists to prevent",
    "The module keeps a reader of its own for the flags no page names, and `parse-args` is kept for that one caller rather than taken away",
    "`sr` stops handing `--no-launch` and the module learns the same thing from `--start-mode`, after which nothing reads a flag no page names and `parse-args` goes with no page changing",
    "`parse-args` goes and its one caller moves to `takenFor`, accepting that the handshake flag is refused and `sr` changes what it runs",
  ],
} as const satisfies Question
