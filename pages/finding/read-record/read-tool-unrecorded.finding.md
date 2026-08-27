---
id: 18aeee49-ea64-5117-9347-0eb7169d91b7
slug: read-tool-unrecorded
page-type-slug: finding
title: "Read tool unrecorded"
domain-slug: domain/read-record
---

# Claim

A read made through the native `Read` tool reaches the read record for some files and not for others, while `domains/folders/instructions-repo.md` states that the native Read tool is recorded.

# Evidence

In one seat on 2026-08-12, five documents read through the native `Read` tool — `domains/land.md`, `domains/read-record.md`, `domains/instructions-gate.md`, `domains/person-authority-page-data.md` and `domains/folders/pages-ui.md` — were each reported by `read-before-write` as "never read by this agent", and `tools/read.ts` then reported "nothing on record says you have read it" for all five. In the same seat and the same session, `domains/agent-harness.md` read through the same tool was recorded and reported unchanged since that read. So the failure is intermittent rather than total, which is the shape that reads as working.

Separately, `tools/read.ts` refuses to print into a pipe so that no record can outlive a body that did not reach the reader; a call whose output the harness persisted to a file instead of returning it recorded the reads anyway, which reaches the same state by another route.

Not measured: why the hook records some calls and not others, whether the boundary is file size, timing, or which tool call in a turn; and whether the same holds in seats other than this one.
