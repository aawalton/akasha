---
id: 489137fc-0f02-57ec-8dee-985e15518422
slug: recorder-out-of-reach
page-type-slug: finding
title: "Recorder out of reach"
domain-slug: task/interview-loop
---

# Claim

A seat booted on `interview-loop` alone meets "the recorder" with nothing in its governing set that says what one is. The role is live at `domains/roles/recorder.md`, so the word is declared rather than jargon, but `ops instructions governs` on the subject returns neither that file nor `domains/interview-session.md`, and `domains/roles/interviewer.md` never names it. A `glossary: [recorder]` key would close it, at the cost every reader pays at boot.

# Evidence

Raised by the review-instructions seat on `domains/tasks/interviewer/interview-loop.md`, which left the line standing and named the fork rather than adding the key: an Add is the one act there that grows what every reader pays at boot.

Verified myself rather than taken from the report: `domains/roles/recorder.md` exists; `grep -c -i recorder domains/roles/interviewer.md` returns 0; `ops instructions governs --file-path domains/tasks/interviewer/interview-loop.md` lists agent-harness, folders/instructions-repo, global, role, roles/interviewer and task unconditionally, and no recorder document under any condition. The only other live prose naming a recorder is `domains/interview-session.md:13`.

No instrument settles it. `terms-in-reach` does not report this file, and the reason first recorded here — that it keys on capitalised uses — is not the operative one. Its term set is built from `glossary:` manifests alone, its own header reading "A domain nobody names is an ordinary domain", so `recorder`, which no manifest names, is not a term it asks about at all. Read from `tools/checks/terms-in-reach.ts` on 2026-08-09.

The reviewer's own read, which I neither checked nor rule on: `prepare-interview` runs before `interview-loop` in the same seat, so the antecedent has usually arrived in practice, and the real question is whether this document should stand alone.

A second review-instructions reading of the same subject, on 2026-08-09, reached this gap independently and stopped at the same place for the same reason. The claim has now been raised by two readings and settled by none.
