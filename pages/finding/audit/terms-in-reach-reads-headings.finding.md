---
id: 7ada5c81-61f3-5303-b4e0-08caedb728b3
slug: terms-in-reach-reads-headings
page-type-slug: finding
title: "terms-in-reach reports the Design heading as an out-of-reach term on every document carrying one"
domain-slug: domain/audit
---

# Claim

The `terms-in-reach` audit reports the word `Design` as used out of its readers' reach on every document carrying a `# Design` heading, including dozens of `properties/*.md` in the same run. It reads a section heading as a term, so the report is a fault in the audit rather than in any document it names.

# Evidence

Read off the `review-instructions` reading of `domains/audit.md` finished 2026-08-21, read line by line, bottom to top. That reading ran `ops instructions run-checks` twice end to end and saw the same report against dozens of documents in one run, which is what tells it apart from a real breach on the subject.

The reading did not act on it, the fault being in a different audit from the one it was reading.

Not measured here: I did not run `terms-in-reach` myself, did not open it, and did not check whether it reports other headings the same way. How many documents the run names, beyond "dozens", is uncounted.
