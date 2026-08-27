---
id: 12fa9b94-258c-5bb6-b31e-1fc1ef2e1537
page-type-slug: finding
title: "Reachable from no seat"
domain-slug: domain/interview-session
---

# Claim

`domains/interview-session.md` is reachable from no seat. Nothing in the corpus names it as a parent or carries it in a glossary, so no boot composes it — not `prepare-interview`, not `interview-loop`, not `domains/roles/interviewer.md`. Its Design carries "The interviewer and recorder run one session together, and each can message the other", which is the ground stage 5 of `prepare-interview` acts on, and no reader of that document holds it.

# Evidence

Raised by the review-instructions seat on `domains/tasks/interviewer/prepare-interview.md`, which left it rather than adding an edge: whether it wants an edge on the two interviewer task documents, an edge on the role, or a judgment that the domain names an area too large for either is a domain-structure call across several documents rather than a line of its subject.

Verified myself rather than taken from the report: `grep -rn "interview-session" domains/ tools/`, excluding the file itself, returns nothing at all. `ops instructions dag --up interview-session --paths` prints interview-session, then agent-harness, then global — a chain upward with nothing hanging below it.

This is the second finding this pass to land on the same ground from the other side: `interview-loop/recorder-out-of-reach` records that "the recorder" stands in `interview-loop` with nothing in its governing set defining it, and `domains/interview-session.md:13` is the only other live prose naming a recorder. Two reviewers reached it independently, from two documents.
