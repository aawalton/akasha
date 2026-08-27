---
id: d657578b-bccd-5757-99eb-dc6d46f8bc20
slug: read-record-survives-a-redirect
page-type-slug: finding
title: "Read record survives a redirect"
domain-slug: repo/akasha-repo
---

# Claim

`ops read` refuses to print into a pipe, and does not refuse a redirect. `ops read --file-path a > somewhere` is allowed, and records a full read of every file it names while the bodies land in a file the agent may never open.

So an agent can hold a read record reading as true for documents it never saw, and every gate that refuses an act for an unread document passes it on exactly those documents.

# Evidence

The pipe refusal is real and easy to meet, which is what makes the redirect worth filing: an agent refused once for a pipe reads the command as guarded against this shape.

A helper did it unprompted and by accident. It read a set of documents with the output redirected into a scratch file, then looked at the tail of that file rather than at the bodies. The record claimed a full read of every document named. It caught itself, read the captured file whole, and reported it — so the record was true afterwards, and was not for the interval between.

The documents in question were the ones it was about to gate writes against, which is the case the guard exists for.

Not measured: whether `>>`, `tee`, process substitution or a redirect to `/dev/null` behave the same way, nor how many read records held today were taken this way.
