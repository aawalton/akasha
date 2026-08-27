---
id: 266eb2a1-b99a-5dc6-84ce-d16a60eb03c3
page-type-slug: finding
title: "Reason parser stops at the first bracket"
domain-slug: domain/instrument
---

# Claim

`readerReasons` in `hook-reasons-mirror.ts` captures `\[([^\]]*)\]`, so it stops at the first closing bracket: a reason containing `]` yields the empty set and a tuple built with a spread yields only its literal members — and neither returns null, so the check names real reasons as missing from a tuple that carries them.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/halt-reader-without-vocabulary.md` dispatched from `review-documents`. The reading carried it back as a defect it could not land from a refusal document. I reproduced all four shapes against the function's own source:

- `["a]b", "c"]` returns the empty set
- `[...BASE, "c"]` returns `["c"]`
- `: readonly string[] = [...]` returns null
- `Object.freeze([...])` returns null

Only null fires `halt-reader-without-vocabulary`. The first two return a set, so the check proceeds and emits `halt-reason-unread` for every reason it failed to see — naming specific reasons as absent from a tuple that carries them, aimed at the code repo while the fault is in this parser.

The spread shape is how a tuple looks once it is split across files, so it is a change someone would make deliberately and correctly.

The same reading landed the repair the two null shapes needed: the body now ends "— the tuple was renamed, moved, or written in a shape this cannot read", the clause both design-siblings already carry and the three causes `hook-reasons-mirror.ts` states in its own comment. Without it an agent is sent to find the constant sitting on line 46 and to conclude the refusal was wrong.

`domains/instrument.md` carries Negative Control, and this is the arm where the check reports a difference it manufactured.

Not measured: whether either shape has ever stood in the code repo, or what bracket matching would cost against importing the tuple where the repo is present.
