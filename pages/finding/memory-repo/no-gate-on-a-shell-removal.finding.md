---
id: 16698298-7f31-5b89-abac-2932871f6994
page-type-slug: finding
title: "No gate on a shell removal"
domain-slug: repo/memory-repo
---

# Claim

Nothing guards a shell removal in the memory repo. `block-memory-writes.ts` refuses Write and Edit into a Claude Code agent-memory store and consults neither repository; `block-ungoverned-writes.ts` guards code worktrees. Neither sees `~/memory`. So a finding, an initiative or a project document can be deleted from a shell with no gate between the command and the loss, where the same act through `ops memory rm` is recorded and committed.

# Evidence

Raised by the review-instructions reading of `domains/tasks/lead/review-findings.md` on 2026-08-07, as one of two things it found outside its own document.

Verified myself: `tools/hooks/block-memory-writes.ts`'s own header says it refuses "a `Write` or `Edit` whose path lands in a Claude Code memory store", that the rule is "some DIRECTORY component starts `agent-memory`", and that it "consults neither repository". It also states it matches only `Write|Edit`. So the hook's subject is the Claude Code store, not `~/memory`.

I did not attempt a shell removal to confirm the absence, and would not: the act is the loss.

The reviewer separately reports that `ops memory rm --help` states a removal asks for no reading of what it removes — so the read obligation on line 20 of the subject is enforced by nothing but itself. I did not run that help.

Why the reviewer did not name `ops memory rm` on the subject's own Delete line, which I record rather than endorse: the whole lead corpus writes **Delete** without a verb, and fixing it on one document would make the silence on `review-initiative` and `define-definition` read as licence.
