import type { Finding } from "../finding.page-type.ts"

export const aTestHostBothInventsAndHidesFaultsOfItsSubject = {
  id: "01a064f4-3901-755e-808c-e8549fb31f3e",
  pageTypeSlug: "finding",
  slug: "a-test-host-both-invents-and-hides-faults-of-its-subject",
  domainSlug: "domain/alan-harness",
  claim:
    "The runtime a test runs under can both invent a fault the subject does not have and hide one it does. Both happened in one suite against one subject. A test written on the wrong runtime is evidence about that runtime rather than about the code.",
  evidence:
    "Measured 2026-09-03 on the editor extension's observation writer. The subject spawns a child over four pipes. Its real host is node because the extension host is node. Its test host was bun.\n\nThe invented fault. Spawning with four stdio pipes under bun 1.3.14 loses the race on the fourth pipe somewhere between one run in twenty and one in five and the child answers `nothing is listening on fd 3`. Under node 22 it was nought of thirty. The suite carries a bounded retry keyed on the child blaming that pipe. Left unread this reads as the rewrite having broken something.\n\nThe hidden fault. After a stream is ended a further write is dropped by node which raises an error event. With nothing listening node rethrows it so an ask fired in the same tick as a dispose killed the extension host with ERR_STREAM_WRITE_AFTER_END. Bun delivers those bytes anyway. So the same ask succeeded under bun and landed its state. A test written on bun went green against the broken code and would have gone green against the mend too so it told nobody anything.\n\nWhat answered it. The case that pins the mend drives the real client and the real child under node from inside the suite rather than stubbing either. The other cases keep their bun host where the difference does not reach.\n\nOne caution on the numbers. A rate measured on one spawn pattern does not carry to another. The sibling suite spawning the same way but less tightly ran eleven clean runs one after another which rules out the higher rate for it.",
} as const satisfies Finding
