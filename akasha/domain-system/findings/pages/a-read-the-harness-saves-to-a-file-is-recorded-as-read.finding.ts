import type { Finding } from "../finding.page-type.ts"

export const aReadTheHarnessSavesToAFileIsRecordedAsRead = {
  id: "01a060d3-cb3c-73ef-bbc5-b7016cdac78a",
  pageTypeSlug: "finding",
  slug: "a-read-the-harness-saves-to-a-file-is-recorded-as-read",
  domainSlug: "domain/akasha-migration",
  claim:
    "An agent harness that saves a large tool output to a file and shows the agent a short preview defeats the read record the same way a shell redirect does, and the guard cannot see it. The read is unpiped, so it is recorded; the body reaches a file the agent is told not to open. A seat batching twenty owed reads with its write met this on its first run.",
  evidence:
    "Met on 2026-09-02 by the seat recreating `temper/shared-capture-errors-decision-core`. A dry run owed twenty reads. The brief says to put every owed read and the write in one shell call, so the seat ran three `akasha read` calls naming twenty pages, unpiped, followed by the write, six times over in a loop.\n\nThe call's output came to 172.6 kilobytes. The harness wrote it to `tool-results/b7xjnxvfh.txt` and handed the seat the first 2 kilobytes. Every page after the first forty lines reached a file rather than the seat.\n\nThe guard saw an unpiped read and recorded it. The next write passed with `37 checks judged the 15 paths asked for, and none refused`. So the record says twenty bodies reached a reader, and two of them did.\n\nThis is the same defect as `a-read-redirected-into-a-file-is-recorded-as-read`, reached without the seat choosing a redirect. The seat wrote no redirect. Batching is what the brief asks for, because the record expires in about two minutes and a round trip between the read and the write loses it. So the two rules pull against each other: read few enough pages that the bodies fit in an answer, or read them all in one call and let the harness swallow most of them.\n\nWhat would mend it is a smaller answer. `akasha read` already caps one call at 28,000 bytes and prints the command for the remainder. Three such calls in one shell call come to 84,000, which is past what a harness will show. A cap that counted across the whole shell call, or a way to ask the record what it still owes without reprinting what it holds, would let a seat satisfy the gate in bodies it has actually read.",
} as const satisfies Finding
