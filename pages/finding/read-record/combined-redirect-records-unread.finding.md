---
page-type-slug: finding
id: b3e16ba4-aeff-5e47-aa68-d6c3d428e476
title: "A read redirected with 2>&1 records a reading nobody received"
domain-slug: domain/read-record
---

# Claim

A read whose stdout and stderr go to the same file records the reading without the body reaching anyone, because that is indistinguishable by `fstat` from a harness capturing both streams together.

# Evidence

`tools/lib/discarded.ts` catches `/dev/null`, a pipe, and "a file only this redirect opened" — the last by fstat'ing both descriptors and returning null where they name the same file. That carve-out is deliberate: an agent harness capturing a command's whole output gives it exactly two descriptors on one file, and refusing that would refuse every ordinary read.

`bun tools/read.ts --file-path <ten paths> > /var/tmp/ryn-draw/reads.txt 2>&1` therefore returns 0, prints the bodies into the file, and records all ten as read. Observed 2026-08-21: the same command without `2>&1` refuses with "this is printing to a pipe". The record then says an agent read ten documents whose text never entered its context, which is the state `read-record` exists to make impossible.

No fstat can separate the two cases, so this is a limit of the test rather than a defect in it. Whether it matters turns on whether an agent would ever redirect to shorten a gate rather than to read the file afterwards — which nothing here measures.
