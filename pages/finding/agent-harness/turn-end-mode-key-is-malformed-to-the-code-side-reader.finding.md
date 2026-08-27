---
id: 2a2fe521-1c54-5739-a3db-fa0056bbff47
page-type-slug: finding
title: "Turn end mode key is malformed to the code side reader"
domain-slug: domain/agent-harness
---

# Claim

The turn-end record's `mode` key is admitted by the reader in this repository and refused by the one in the code repository, so the day a guard starts writing it, the code-side census counts every new record as malformed — and the docblock stating why that is safe rests on a premise that stopped being true when the reader crossed repositories.

# Evidence

`packages/agents/shared/hook-decision-core.ts:339` declares `hookDecisionSchema` as a `z.object({ ts, hook, agent, session, decision, reason }).strict()`. Six keys, and `.strict()` refuses a seventh.

`tools/lib/turn-end-record.ts:68` here declares `ADMITTED_KEYS = [...REQUIRED_KEYS, "mode"]`, and its header at line 40 says every record now states the mode outright, with the field kept optional only for the corpus written before it existed.

So the two readers disagree about a record carrying `mode`: a RECORD here, one more `malformed` there. This has not been reached live — a porting seat measured 0 malformed on both sides across 14,503 records in 17 day files, so nothing is writing `mode` yet.

The code-side schema states its own justification: "Strict, because both sides of this format live in one repo and we own it. A field added on one side and not the other then shows up as a malformed count — visible and bounded." That reasoning was sound while both sides stood in one repository. The reader has now crossed to this one, so the two sides are no longer added to together, and what the strictness buys is a malformed count in a repository nobody will be editing when the field lands.

It bears on live work rather than a hypothetical. The hook-enforced turn-end behaviour Alan is settling with Ryn is exactly the change that would start stamping a mode onto each record, and the census that would misreport it is the one that measures whether that enforcement is working.

Not repaired in the same breath: the fix is a decision about which reader is authoritative for this format once the port completes, and `domains/agent-harness.md` says what a row means is settled by the harness rather than by the code that wrote it — which points at removing the code-side reader rather than widening its schema. That is Alan's call and not a repair to land quietly under a port.
