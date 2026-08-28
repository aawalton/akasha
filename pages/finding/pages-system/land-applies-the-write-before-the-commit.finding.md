---
id: 8e8671f6-4912-50d0-80a0-a94ced1d441c
page-type-slug: finding
slug: land-applies-the-write-before-the-commit
title: "Land applies the write before the commit"
domain-slug: domain/pages-system
---

# Claim

`repo/land/land.ts` writes every body and unlinks every removal before it commits, so a commit lost to the git index lock leaves the act applied and unrecorded.

# Evidence

Read 2026-08-27.

Held the index lock by hand and ran a write-and-remove that gates clean: exit 3, no commit, and `git status` showing ` M` on the written file and ` D` on the removed one. The removal half is destroyed too, which `a-write-passes-its-gate-and-then-fails-to-commit` did not record.

Making the write and the commit one event needs a locking or staging protocol and was not attempted; the refusal now names what stands in the working tree instead of reading as though nothing happened.
