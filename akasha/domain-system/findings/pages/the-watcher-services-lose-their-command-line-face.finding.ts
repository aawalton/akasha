import type { Finding } from "../finding.page-type.ts"

export const theWatcherServicesLoseTheirCommandLineFace = {
  id: "01a0603e-0c8a-72ac-a65c-15eb1d5c7c89",
  pageTypeSlug: "finding",
  slug: "the-watcher-services-lose-their-command-line-face",
  domainSlug: "domain/temper",
  claim:
    "The two watcher services were command line tools as well as service entries. Each carried a `tool` export naming its summary and repository, a `--help` body of prose, and the watcher carried `--json` to emit its startup line as a record. The akasha modules the services now run take no arguments and print one line, so all of that is gone.",
  evidence:
    '`services/temper-watcher.ts` opened with `export const tool = { summary, repos: ["akasha"] }`, which is how the `ops` tool catalog outside akasha finds a script and says what it does. It carried a 26-line `HELP` body covering what the worker is, why one runs at a time, what happens on SIGTERM, and what exit 3 means. `--json` made the startup line `{ ok, pid, log_path }` rather than `pid=<n> log=<path>`.\n\n`services/temper-watcher-liveness.ts` carried the same `tool` export and a 20-line `HELP` body explaining the two signals, the down-edge paging, the debounce, and why it watches from outside.\n\nThe recreations are `akasha/temper/temper-watcher/watcher-running/watcher-running.module.code.ts` and `akasha/temper/temper-watcher/watcher-liveness/watcher-liveness.module.code.ts`. Each runs under `import.meta.main` with no argument parsing, matching how `akasha/pages-system/pages-system-service/page-listening` and `akasha/readout-system/readout-relay` are entered.\n\nThe prose is not lost so much as moved: what the help bodies explained is now stated as invariants on the module pages and on the two service pages, which is where akasha keeps that kind of sentence. What is genuinely gone is the `--json` startup line and the tool catalog entry. Nothing was found that reads either, but nothing here proves nothing does.\n\nThe old files were left where they are.',
} as const satisfies Finding
