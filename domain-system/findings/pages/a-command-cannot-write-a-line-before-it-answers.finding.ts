import type { Finding } from "../finding.page-type.ts"

export const aCommandCannotWriteALineBeforeItAnswers = {
  id: "01a0603f-86ce-7198-9574-af2d5f3ca41e",
  pageTypeSlug: "finding",
  slug: "a-command-cannot-write-a-line-before-it-answers",
  domainSlug: "workspace-package/command-system",
  claim:
    "An akasha command answers once, with a finished array of report lines. A command that must emit as it goes, or hand its terminal to a child process, has nowhere to put that. Two of temper's 66 commands need it and cannot be recreated whole: `temper-addon-build --watch` hands the terminal to a compiler that never exits, and `temper-watcher-logs` emits one JSON record per line as it reads. Several long builds also printed progress a caller watched.",
  evidence:
    "`akasha/command-system/calling/calling.module.code.ts` declares `Answering` as a function giving back `Answer`, and `Answer` carries `report: readonly string[]` decided when the call returns. `akasha/command-system/command-system.workspace-package.ts` states `It prints nothing itself` as a departure, and that a command's answer carries a code saying whose fault it was. Nothing in the type gives a command a way to emit a line while it runs.\n\n62 of the 66 files under `tools/commands/temper/` call `process.stdout.write` directly. Most write once at the end and lose nothing in the recreation. Two do not.\n\n`tools/commands/temper/addon/build.ts` spawns the compiler with `stdio: ['inherit', 'inherit', 'inherit']` and, under `--watch`, stays in it: the compiler holds the terminal and recompiles as files change, printing as it goes. There is no answer to give back because the call never ends. The recreated page keeps `--watch` in its `taking` and its `helpNotes`, and its code cannot honour it.\n\n`tools/commands/temper/watcher/logs.ts` writes one JSON object per line, which is what `ops loki logs` does and what its callers read. Gathering the whole run into `report` and answering at the end changes it from a stream into a batch, which is workable for a bounded `--limit` and wrong for a follow.\n\nThe same shape reaches `temper-addon-typecheck`, `temper-addon-bundle-publish` and `temper-community-addon-update`, each of which ran for minutes and printed progress. Those degrade rather than break.",
} as const satisfies Finding
