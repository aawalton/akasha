import type { Finding } from "../finding.page-type.ts"

export const theReadRecordSaysABodyWasSentNeverThatABodyArrived = {
  id: "01a061ef-9538-7000-aeee-95f0cd57fa5c",
  pageTypeSlug: "finding",
  slug: "the-read-record-says-a-body-was-sent-never-that-a-body-arrived",
  domainSlug: "workspace-package/command-system",
  claim:
    "The read record says a body was sent, never that a body reached the agent. Three boundaries between the read command and the agent can eat a body, and the record counts each one as read. Two of the three say nothing an agent would read as a failure, and the third names an amount of output rather than a lost body.",
  evidence:
    "Measured 2026-09-02 across three agents on one checkout. `reading.module.ts:119` already names the gap: nothing is in the record that did not reach the agent.\n\nFirst boundary: the read command's own 28000-byte answer. The command names the files left undelivered and hands back the exact next call, so recovery is possible. This boundary is the honest one.\n\nSecond boundary: an `akasha read` and an `akasha edit` chained into one shell call. About 20000 characters went missing from the middle of the read with no marker at all, while the record counted every file. The write then landed on bodies nobody held.\n\nThird boundary: the harness answered `Output too large (44.8KB). Full output saved to <path>` with a 2KB preview. Four module pages were counted as read and no body reached the agent. Commit `a2118713a3` landed that way, and the debt was paid afterward with the change already in.\n\nBoth agents who met the third boundary read the marker as a note about output size rather than as the gate going blind. The rule an agent can act on: any message about output size near an `akasha read` is a read failure whatever the message calls the failure.\n\nTwo lists look alike and are not. The read's trailing `N files were left unread here` is the read's own output cap and never settles. The refused write's own list is the debt. Chasing the read's list went 19, 53, 31, 17. Taking the write's list went 19, 3, 1.",
} as const satisfies Finding
