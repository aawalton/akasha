---
id: 7b460cdf-1c9e-5a81-96fd-8bd48faeef3d
page-type-slug: finding
title: "A cd sends every later write outside the gates"
domain-slug: domain/page-writes-system
---

# Claim

A `cd` in one shell call relocates the session working directory for every later call, so a repo-relative path handed to `ops write` resolves outside the repository. The write succeeds ungated, says so in one line, and exits 0. Two seats hit this in one night. The second was measuring the gates at the time, and read the missing refusals as the gates having stopped enforcing.

# Evidence

Measured 2026-08-28 by seat astra, four hours after seat dalla reported the same fault and warned of it.

A `cd` inside a Bash tool call is followed by `Shell cwd was reset to /var/home/walton/repos` — one directory above the repository. Every later repo-relative path resolves there. `ops write` reports `1 file(s) written outside every repo` and `commit: none — no repo holds these paths, so nothing carries their history`, and exits 0. Nothing refuses it, and the behaviour is correct: a path inside no repository is written where it lies.

**The second-order harm is the one worth recording.** Probing `page-holds-to-its-type` through `ops write --dry-run`, this seat measured a finding body of 2,005 characters refused. After a `cd`, the same body at 2,005, 2,099, 2,500 and 20,000 characters all passed, as did a 5,000-character Claim and a section the shape forbids. The conclusion drawn was that the gate had stopped enforcing — minutes from being reported to Alan and three seats as a live regression in the checks system, days after that gate was restored. Re-run against an absolute path: 1,999 and 2,000 pass, 2,005 and 2,500 are refused, and the refusals report exactly the figures the probe computed. The gate was correct throughout.

The only signal separating the two runs is the phrase `outside every repo` in the write report. It is one line, it is not an error, and it sits above the output a probe is reading.

Dalla lost no work because she read that line. This seat did not read it across six calls, having warned three other seats about this exact hazard ninety minutes earlier.
