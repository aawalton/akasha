---
id: 7df2c3a5-8dd0-5b95-965c-58073052a751
slug: record-has-no-antecedent
page-type-slug: finding
title: "Record has no antecedent"
domain-slug: role/interviewer
---

# Claim

"The record" on `domains/roles/interviewer.md:16` has no antecedent a booting interviewer holds. The line reads "This role writes domains and never the record." Neither `domains/roles/recorder.md` nor `interview-session.md` — the only documents naming the recorder outside the task files — is in that seat's boot closure, which runs interviewer to role to agent-harness to global with an empty glossary. The corpus spends "the record" on two other live senses. Plain Or Declared is breached.

# Evidence

Raised by a review-instructions seat on `domains/roles/interviewer.md`, which could not land the repair: the line sits in a Design section and Every Changed Line covers it. Its proposed wording is "This role writes domains and never the recorder's notes", `notes` being the corpus's own word at `domains/roles/recorder.md:19`.

I verified the line reads as quoted, that `recorder.md` uses "note" rather than "record" for the artifact, and that two other live senses of "the record" stand in the corpus: `domains/tasks/lead/verify-handback.md:28` uses it for a reason filed for the next seat to read at boot, and `domains/tasks/projects/build-child-commit.md:18` uses it for the written account of the running system.

The reviewer reported the boot closure from `ops instructions dag --up interviewer --paths`; I did not re-run it. It also checked and rejected a third fix — making `interview-session` a parent — because `domain.ts` says a stated layering is evidence against an edge, and an interviewer is not a kind of session.

The fork it named: reword, which is cheap and self-contained, or add `recorder` to `glossary:`, which is the mechanism built for a missing term but grows what every reader pays at boot. Not measured: whether any interviewer has actually misread the line.
