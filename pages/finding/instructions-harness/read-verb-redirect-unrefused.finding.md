---
id: 00d547a4-daf8-5557-be54-7506367541c5
slug: read-verb-redirect-unrefused
page-type-slug: finding
title: "Read verb redirect unrefused"
domain-slug: domain/global
---

# Claim

`ops instructions read` refuses a pipe and a redirect to `/dev/null`, but exits 0 on a redirect to an ordinary file, where the body reaches no agent either.

# Evidence

Hit and then probed by a dispatched `review-instructions` seat on 2026-08-11, against `domains/theme.md`. The read record did not move on the redirected run, because an unchanged already-read file has no record to write, so no case was found where the verb records a delivery that did not happen.

Not measured: whether a first read, or a read of a file changed since its last, writes a record when its stdout is redirected to a file.
