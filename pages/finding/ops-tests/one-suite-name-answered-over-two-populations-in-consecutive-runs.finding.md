---
id: 52a1d0ce-588c-524a-8f11-beeb8d3f638f
page-type-slug: finding
title: "One suite name answered over two populations in consecutive runs"
domain-slug: domain/ops-tests
---

# Claim

`ops tests run pages-system` answered over two different populations within about a minute, and neither answer said which one it had taken: one resolution ran 1,117 tests across 19 files and passed, the other ran 3,880 tests across 161 files and reported 131 failures. The files I was working on were byte-identical across both. THIS IS UNREPRODUCED, and the boundary belongs in front of the claim rather than under it: another seat ran the same command three times immediately afterwards and got the 19-file resolution and a pass every time, and I have not seen the 161-file resolution since. It is filed rather than dropped because of what the mechanism would be if it is real. The same command, given the same argument, answering over two populations is worse than a wrong number: both answers are internally consistent, both end in a verdict, and neither names the population it took, so nothing downstream can tell which it was handed.

# Evidence

Observed 2026-08-28 in akasha on `main`, around `e4e38184d`, while running the suite between deliberate breaks of `pages-system/query/reduce.ts` and `pages-system/query/query.ts`. Both verdicts below are quoted from output I still hold rather than described from memory.

**The 19-file resolution**, which every run before and since has given:

    [tests run] unit — 19 path(s)
    1117 pass
    0 fail
    Ran 1117 tests across 19 files. [5.31s]
    VERDICT: PASS — the-named-test-suites: bun exited 0 [over 19 test files (denominator not computed)]

**The 161-file resolution:**

     131 fail
     6999 expect() calls
    Ran 3880 tests across 161 files. [14.21s]
      [(as given)] 131 failing test(s) — bun's own output is on stderr above
    VERDICT: FAIL — the-named-test-suites: 131 failing test(s) [over 161 test files (denominator not computed)]

**What I hold and what I do not.** The verdict block above is one run, quoted. The run immediately before it showed the same large set of formula conformance failures, but I had filtered that run's output to lines matching `(fail)` and kept no file count for it, so I cannot say it was also 161. The honest statement is that the 161-file resolution is confirmed on one run, and one adjacent run showed the same failure population with its count not captured. At the time of the quoted run my own deliberate break had already been restored, so none of the 131 were mine.

**What the failures were.** Almost all were formula conformance cases citing line numbers, for example, verbatim:

    (fail) a computed key is named exactly as a stored one — cites pages/domain/formula-language.domain.md:44
    (fail) the functions list names exactly the functions the corpus covers

**Three measurements that bound any diagnosis.** Line 44 of `pages/domain/formula-language.domain.md` reads `A case works out only the value of the row whose test passed.`, while the claim that case names stands at line 48, `A formula names a computed property exactly as it names a stored one.` — so the citation is off by four, and that file's last change is `3e1461325`. Exactly one `conformance.unit.test.ts` stands in the repository, at `pages-system/formula/conformance.unit.test.ts`, and it is inside the 19-file resolution, where it passes; so the two populations are not one copy plus a stale duplicate. The two runs name their group differently: the passing one `unit`, the failing one `(as given)`.

**Two candidate readings, neither asserted.** `pages-system` is both a directory and a domain slug, and 161 files against 19 is roughly the difference between the two; that collision is already filed at `884c32d9f`. Separately, a suite that asserts on a domain document's line numbers breaks whenever anyone edits that document's prose, which would account for the failures but not for the population.

NOT MEASURED. Which of the two resolutions is the correct reading of the argument; whether those 131 failures stand for anyone else or stood only in that process; what selects between the two resolutions; and whether the group name `(as given)` is the marker of the second path or an unrelated label.
