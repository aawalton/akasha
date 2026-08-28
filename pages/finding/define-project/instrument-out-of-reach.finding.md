---
id: 9132df32-161e-5a14-9147-f450198cae07
slug: instrument-out-of-reach
page-type-slug: finding
title: "Instrument out of reach"
domain-slug: domain/global
---

# Claim

`instrument` reaches `define-project`'s readers undeclared. Line 23 turns on it — "A criterion no instrument settles is met by whoever reports on it" — and `domains/instrument.md` declares the word as "code run to find out what is true". That domain is in no reader's boot here: `define-project` sits under `project` and `task`, neither reaches it, and the document declares no `glossary:`. Ordinary "instrument" is broad enough to admit an agent's own report, which is what the line exists to rule out.

# Evidence

Raised by the review-instructions reading of 2026-08-07, which landed no remedy because both cost something only a lead can weigh.

Verified myself: `domains/instrument.md` is live, and `ops instructions governs --file-path domains/tasks/lead/define-project.md` names it zero times. The reviewer also reports that `ops instructions read` on the subject brought 18 governing documents without it, and that `domains/global.md`'s glossary does not list it.

Plain Or Declared exempts a declared word only in its declared sense, and the plain sense here is the wrong one — an agent's own report is an instrument in ordinary English and is exactly what line 23 rules out.

The two remedies, as stated: `glossary: [instrument]`, which draws that whole domain — Negative Control, Population and Horizon under it — into every boot of this document for one word; or reword the line to avoid the term, which is a call about the task corpus generally rather than about this document.

This is the third finding this run on a word standing outside its reader's reach. The others are `interview-loop/recorder-out-of-reach` and `interview-session/reachable-from-no-seat`. Whether they are one problem is not something any of the three readings could see.
