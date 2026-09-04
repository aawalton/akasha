import type { Finding } from "../finding.page-type.ts"

export const theReadGuardSeparatesARedirectByComparingStdoutWithStderr = {
  id: "01a06811-e8a4-726d-8c1a-3d8004ab1385",
  pageTypeSlug: "finding",
  slug: "the-read-guard-separates-a-redirect-by-comparing-stdout-with-stderr",
  domainSlug: "workspace-package/command-system",
  claim:
    "`discardedBy` compares fd 1 against fd 2, so a redirect is barred as `a file only this redirect opened` unless fd 2 is that same file. `akasha read --file-path X > out.txt` is refused and records nothing; `> out.txt 2>&1` is accepted and records. This answers what `a-read-redirected-into-a-file-is-recorded-as-read` left open, and narrows it: one redirect slips through and another does not.",
  evidence:
    "`akasha/command-system/reading/reading.module.code.ts` line 180. `same(out, nowhere)` bars `/dev/null`, `out.isFIFO()` bars a pipe, a non-file is allowed, and a file is barred unless fd 2 is a file at the same dev and ino. Capturing both streams into one file is the whole test.\n\nFour forms against pages never read before, each read again afterwards to see what the record says. Piped: exit 1. `> /dev/null`: exit 1, and the page came back whole after. Bare `> out.txt`: exit 1, zero bytes written, refused as `a file only this redirect opened`. `> out.txt 2>&1`: exit 0, and the page came back as already read, along with every page its expansion carried.\n\nThe cost of the imprecision, which is why this is worth a page: I read the refusal as barring every redirect, and reported to my coordinator that my own seat reads had recorded nothing. That was wrong and it was believed. It nearly retired a true finding and nearly replaced it with a false one. The refusal names three forms it bars, and its second, `redirected into a file`, is true of one redirect and false of another.",
} as const satisfies Finding
