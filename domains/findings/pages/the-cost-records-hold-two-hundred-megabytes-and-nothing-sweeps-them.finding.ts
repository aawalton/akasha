import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theCostRecordsHoldTwoHundredMegabytesAndNothingSweepsThem = {
  id: "01a0922e-c5a4-7166-8083-3a1ce27450e9",
  type: "finding",
  slug: "the-cost-records-hold-two-hundred-megabytes-and-nothing-sweeps-them",
  domain: "domain/storage",
  claim:
    "What runs have cost holds 226 megabytes beside the pages, and nothing ever takes a line of it away. check-cost appends a line and opens a numbered part once a file reaches eight mebibytes, and no code removes a part or trims a file. Fourteen parts have already been opened. The workstation sweeps seat log days on a daily timer and sweeps supervisor logs, and neither reaches these. Guards were added to what records this way today, and nine of them run before every bash call every seat makes, so the rate this grows at went up rather than down.",
  evidence:
    "A find over the checkout outside node_modules for files named with logs or entries and held as jsonl adds to 226 megabytes. A find for a part section among them answers fourteen.\n\ncheck-cost opens the next part where a line would carry a file past ENTRY_CEILING, which pages/entry-ceiling states as eight mebibytes. Its page states that a line rolls into the next numbered file where the ceiling is reached, and says nothing about a part ever going.\n\nA search over every code file for entries.uncommitted, logs.uncommitted and ENTRY_CEILING answers eight files: edits-keeping, check-cost, log-day-writing, the file-length check, page-composing, notification-feed-rows, divide-file-page-property and entry-ceiling. None of them removes one.\n\nsweep-log-days removes every log day past the window a log is kept for, which is a seat-log-day rather than a cost record. sweep-supervisor-logs is the other sweeper the workstation runs.\n\nOne check page alone, tests-pass, holds 2741 rows under its check group and 32 under its audit group.\n\nThe records are uncommitted, so this is the workstation's disk rather than the repository's history.",
} as const satisfies Finding
