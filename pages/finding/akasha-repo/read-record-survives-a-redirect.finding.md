---
id: d657578b-bccd-5757-99eb-dc6d46f8bc20
page-type-slug: finding
title: "Read record survives a redirect"
domain-slug: repo/instructions-repo
---

# Claim

`bun tools/read.ts` refuses to print into a pipe, and does not refuse a redirect. `ops instructions read --file-path a > somewhere` is allowed, and records a full read of every file named while the bodies land in a file the agent may never open.

So an agent can hold a read record reading as true for documents it has not read, and `read-before-write` and `read-what-governs` pass it on exactly those documents.

# Evidence

A helper moving the `role` page type did this tonight, unprompted and by accident: it ran `ops instructions read` over the 14 documents under `domains/roles/**/*.md` with `> /var/tmp/.../roles-read.txt`, and had tailed five lines of the result. The record claimed fourteen full reads. It caught itself, read the captured file in full, and reported it — so the record is true now, and it was not for the interval between.

The documents in question were the ones it was about to gate writes against, which is the case the guard exists for.

Not measured: whether `>>`, `tee`, process substitution or a redirect to `/dev/null` behave the same way; whether the memory repo's verb differs; and how many read records standing today were taken this way. One observed instance, self-reported.

This is the fourth instrument tonight found reporting success while checking nothing, after an audit that silently dropped 178 documents when a schema was retired, a gate printing `not judged` on its pass line, and two page types that restated their parent's whole body and held every document of their kind.
