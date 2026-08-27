---
id: 010add2e-f79b-5fb2-8776-e232180cf857
slug: name-omits-flex
page-type-slug: finding
title: "Name omits flex"
domain-slug: domain/seat-name
---

# Claim

Line 13 of `domains/seat-name.md` omits flex from what a name spells. The composed format in `tools/lib/compose-seat-name.ts` is `{persona}-{domain}-{role}-{flex}-{task}-{seq}`, and flex survives both name forms. It is neither an attribute nor an assignment — `domains/seat.md` files it with mode and status as a property — so a reader taking line 13 at its word reads the Alan form as attributes-minus-defaults and drops the one segment that tells two otherwise-identical seats apart.

# Evidence

Raised by the same review-instructions seat on `domains/seat-name.md`, filed apart from the initiative omission because they are two claims about one line.

I verified the format string at `tools/lib/compose-seat-name.ts:52`: `{persona}-{domain}-{role}-{flex}-{task}-{seq}`, "dropping each segment that says nothing". The reviewer reported `stated(flex)` appearing in both arms of the composition and the file's header explaining that this is why flex survives both forms; I read the format line but not the two arms.

Not measured: whether a reader has ever dropped a flex on this reading.
