import type { Finding } from "../finding.page-type.ts"

export const aRemovalLandsWithNoCheckRun = {
  id: "01a05e81-99f5-7a71-bd25-9f679e5dcf7a",
  pageTypeSlug: "finding",
  slug: "a-removal-lands-with-no-check-run",
  domainSlug: "domain/change",
  claim:
    "`akasha remove` lands without running any check. Taking a module folder away answered `no check ran: this landing was made by a program rather than by an agent`, and committed. What it left named a missing folder twice over: the package's part list and its manifest export both pointed at what had just gone. An edit naming those same two paths a moment earlier was refused by the very check that would have caught this, so the two commands disagree about one tree.",
  evidence:
    'On 2026-09-01 I took away `akasha/status-bar-access/stoplight-reading`, a forward whose only callers were eight stoplight endpoints I had just emptied. `akasha remove --file-path akasha/status-bar-access/stoplight-reading` printed the two files taken, then `no check ran: this landing was made by a program rather than by an agent`, and committed d5df09f6e8.\n\nThe order was forced. Editing first was refused, exit 3: `akasha/status-bar-access/stoplight-reading/stoplight-reading.module.ts — no page names `module/stoplight-reading` among its parts`. So a part list cannot be emptied before the folder goes, and the folder going is judged by nothing. Between the two commits the tree carried `"./stoplight-reading": "./stoplight-reading/stoplight-reading.module.code.ts"` in `akasha/status-bar-access/package.json` — an export naming a file git no longer held, which is what `bun install` reads. The follow-up edit at b3608fe7b2 ran 38 checks and none refused, so the checks are there and simply never saw the removal.\n\nThe window was mine to close and I closed it, but nothing in the system would have told me it was open. The call taken: removal first, then repair, because the alternative was not removing at all.\n\nWhat I did not establish: whether `remove` skips checks for every caller or only where it judges a program rather than an agent to have asked, and what draws that line. The message names a reason; I did not read the code behind it.',
} as const satisfies Finding
