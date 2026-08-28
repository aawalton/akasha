---
id: db339a91-6ae4-5b48-8c2c-a2cfa5a41ac2
slug: a-select-is-silent-and-the-write-seam-is-ungated
page-type-slug: finding
title: "The service answers a bad select silently, and its write seam admits a value the write command refuses"
domain-slug: domain/page-queries-system
---

# Claim

The service answers a caller's mistake loudly in one place and silently in the other, and its
write seam admits a value the repository's own write command refuses. Both measured 2026-08-20
against the running service on the workstation.

# Evidence

**A bad `where` key is loud; a bad `keys` key is silent.** Against `project`, which has two
pages:

    where {"no-such-key":{"is":"x"}}   HTTP 400, absent:["no-such-key"], no rows
    keys  ["no-such-key","title"]      HTTP 200, n=2, every row carrying "no-such-key": null

The 400 says in its own words that "a zero here would say nothing about what matched." The 200
says nothing at all. So a caller reading a value out of `keys` cannot tell "no page carries a
value here" from "you named a key that does not exist", and the second reads as the first on
every row.

This is the same shape the `Named Key` rule on `role` warns about, and it is the half the
service has not closed. `absent` already exists and already separates the two failure modes; it
is simply not computed for `keys`.

**The service write seam does not enforce a property's declared type; `tools/write.ts` does.**
`properties/daily-tracking-completion-snapshot.md` declares `completion-snapshot` as
`type: number`.

Put through the repository's write command as a whole file, the `page-holds-properties` gate
refuses it, naming the value: "`completion-snapshot: not a number` is not a number, which is
what `number` states." Nothing was written.

Put through `POST /write/daily-tracking/<name>` with the same value, the answer is
`{"ok":true,...}`, the file carries `completion-snapshot: not a number`, and reading it back
through `/q` returns the string. The two doors into one repository disagree about what a
declaration means.

Both writes above used `1999-01-01`, a date holding no record of Alan's, and the fixture was
removed afterwards. The drafted version of this said "the write gate does not enforce a
property's declared type." Too wide -- the gate does. What does not is the seam that skips it.
