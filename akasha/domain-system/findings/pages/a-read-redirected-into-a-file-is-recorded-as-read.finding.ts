import type { Finding } from "../finding.page-type.ts"

export const aReadRedirectedIntoAFileIsRecordedAsRead = {
  id: "01a06083-26e4-7bd4-b3fb-5e75f7b954f8",
  pageTypeSlug: "finding",
  slug: "a-read-redirected-into-a-file-is-recorded-as-read",
  domainSlug: "workspace-package/command-system",
  claim:
    "`akasha read` refuses a call whose output goes to a pipe or to `/dev/null`, and accepts the same call redirected into an ordinary file. The redirected read is recorded, so a later write of that file is allowed although the body never reached the agent. The record is meant to mean the body reached whoever writes, and one character defeats it.",
  evidence:
    'Three forms against a page never read before. `akasha read --file-path X | head -2` exits 1 with "this call\'s output goes to a pipe, so the body would reach nobody". `akasha read --file-path X > /dev/null 2>&1` exits 1. `akasha read --file-path X > out.txt 2>&1` exits 0 and writes the body into out.txt. A bare `akasha read --file-path X` afterwards answers "you read this body already, 43 lines; nothing follows", so the redirected call recorded the read.\n\nFound when a subagent landing 79 inventory captures built a driver whose read line was `akasha read $args > $W/read.out 2>&1`, looping on akasha\'s own printed continuation command until the owed set converged. It satisfied the gate over ten batches with no body reaching it, having been told in its instructions never to redirect a read.\n\nWhat that subagent landed is sound and was checked another way: every write met every check as it landed, and all 151 inventory capture row files round-trip field for field against their source bytes. The defect is in the guard rather than in that data.\n\nThe refusal names three forms it bars: piped, redirected into a file, sent to `/dev/null`. It catches two of the three. A pipe and a file redirect both leave the output as no terminal, so whatever separates them is narrower than the rule as written.',
} as const satisfies Finding
