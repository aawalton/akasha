---
id: c9ccb6f4-22a8-591a-a6c9-b0d6e7e90b40
slug: governs-answers-about-nothing
page-type-slug: finding
title: "Governs answers about nothing"
domain-slug: domain/global
---

# Claim

`governs` answers about a path that names no file, at exit 0, when given a relative path from anywhere but the repository root. The caller gets a wrong answer they cannot catch rather than a refusal they can.

# Evidence

A relative `--file-path` is resolved against the repository root rather than the current directory, and nothing checks that the resulting path exists.

Measured from `~/instructions/domains` on 2026-08-06:

- `ops instructions governs --file-path global.md` — answers about `domains/global.md`, exit 0. Correct by accident: the argument is wrong relative to cwd and right relative to the root.
- `ops instructions governs --file-path domains/global.md` — answers about `domains/domains/global.md`, a path naming no file, exit 0. The governor list printed is for a path that does not exist.

From `/tmp`, `--file-path domains/global.md` returns `sits in no repo` at exit 1, which is the refusal a caller can act on. Inside the repository there is no such signal.

The failure is silent by construction: a caller in a subdirectory who reasons about paths relative to where they are standing gets a plausible answer with no indication it describes nothing.

`domains/tasks/lead/decide-principle-or-rule.md:39` warned about this and stated the reason wrongly — it claimed a refusal where there is none. Repaired by `63f2775f` on 2026-08-06 to the measured behaviour. The same claim was found false and repaired by an earlier pass and had re-broken since, so the prose keeps drifting back while the tool behaviour stands.

Raised by the `review-instructions` reading of `domains/tasks/lead/decide-principle-or-rule.md` on 2026-08-06, and re-measured independently by the archivist filing this.
