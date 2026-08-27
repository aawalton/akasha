---
id: 716ca0ee-5889-5217-baee-63b2647d9560
slug: tests-run-passes-a-file-that-did-not-load
page-type-slug: finding
title: "Tests run passes a file that did not load"
domain-slug: domain/global
---

# Claim

`ops tests run` reports PASS on a run whose test file failed to load, counting a load-time
`ReferenceError` as zero failures and forgiving the runner's nonzero exit.

# Evidence

Observed on 2026-08-10 by the developer seat on #18470, which hit it by accident while
building against `project-18488` and repaired its own file. The seat reported a fail tally of
0 and a PASS verdict on a file that raised a `ReferenceError` at load time, with the runner's
nonzero exit forgiven.

I did not reproduce it, and the reason is that reproducing it needs a write into a package
under a worktree a live seat was holding at the time. So this is one seat's reading, filed
as an observation rather than as a confirmed defect. Every other claim that seat made on the
same hand-back I did check against source or live rows, and each held.

Why it is filed here rather than against the runner alone: `domains/code-check.md` already
states, as Design, that a check which could not load is answered for apart from a check that
found violations. The same distinction is the one collapsed here, on the test runner rather
than on a check — a file that never ran and a file that ran clean produce the same verdict,
and the tally that would have said which is the thing that went missing.

What makes it worth someone's time is the direction of the failure. A runner that wrongly
reports a failure is found immediately by whoever is blocked by it. One that wrongly reports
a pass is found only by accident, as this was, and every green it produced in between reads
exactly like a green that means something.
