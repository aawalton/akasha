---
id: e3b2e45f-b1e2-55f9-bfec-91e534dd62bd
page-type-slug: finding
title: "Six audits are red on a clean instructions tree, including a whole-run ceiling breach"
domain-slug: domain/audit
---

# Claim

`ops instructions run-checks` is red on a clean tree in the instructions repository. Six audits report: `checks-ceiling` at 67.9s against its 60s ceiling, `cli-help-flag-references`, `code-paths-resolve`, `domain-edges`, `refusals-bound`, and `suite-runs` reporting 10 failing tests. The run was red before and after the reading's own three commits, so none of it is that reading's.

# Evidence

Read off the `review-instructions` reading of `domains/audit.md` finished 2026-08-21, read line by line, bottom to top. That reading ran `ops instructions run-checks` end to end twice, once before its commits and once after, and reports the same six red both times. A second run measured the ceiling at 68.4s.

It named the state rather than acting on it, none of it standing in the subject it was reading.

Not measured here: I did not run the checks myself, did not open any of the six, and did not read the 10 failing tests. Which of the six are one cause and which are separate is unread, and how long the tree has been red is not established.
