import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theChangeThatWouldPayForARunPerTestFileIsRare = {
  id: "01a0922b-91b8-722a-b47d-a1aed9dce859",
  type: "finding",
  slug: "the-change-that-would-pay-for-a-run-per-test-file-is-rare",
  domain: "domain/cpu-limit",
  claim:
    "Running each test file in a runner of its own would cost almost nothing at a change and a great deal at an audit. Over the last three hundred commits, two hundred and thirty-six named no test file at all, and thirty-eight of the sixty-four that did named exactly one, so the median change that runs tests already runs one file in one runner. Six commits in three hundred named more than seven. An audit is the other case: the repository holds one thousand four hundred and twelve test files, which run today in about fifteen runners and would become one thousand four hundred and twelve.",
  evidence:
    "The count for each commit is the files that commit touched, folded onto the page each one sits beside, kept where a test file sits beside that page and is there at that commit.\n\nThe spread over three hundred commits, as files named against commits: 0 named by 236, 1 by 38, 2 by 10, 3 by 5, 4 by 1, 5 by 1, 6 by 2, 7 by 1, 10 by 1, 16 by 1, 26 by 1, 31 by 1, 34 by 1, 52 by 1. They add to two hundred and seventy test files over three hundred commits.\n\nSo a run per file would add about two hundred spawns over three hundred commits, and almost all of them fall on the dozen largest changes rather than on the ordinary one.\n\nWhat a spawn costs is read off the 2183 runs of the tests-pass check that ran tests: the median run took 701 milliseconds, the mean 2994, the worst 365054, and the mean processor time was 1.97 seconds.\n\nA find over the checkout outside node_modules and the git folder answers 1412 files named .test.ts or .test.tsx. code-tests batches up to a hundred files of one group into one runner, so an audit's runners are counted in tens.\n\ncode-tests already holds the per-file road: spentIn runs one file per spawn, and slowIn calls it, but only where a batch has already gone past five seconds times the files in it or has died on a signal.",
} as const satisfies Finding
