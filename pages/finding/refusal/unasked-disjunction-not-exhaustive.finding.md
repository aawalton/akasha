---
id: 7c565204-9287-5c48-a460-97ee366a14d4
slug: unasked-disjunction-not-exhaustive
page-type-slug: finding
title: "Unasked disjunction not exhaustive"
domain-slug: page-type/refusal
---

# Claim

The disjunction on `refusals/resume-notice-unasked.md` is not exhaustive. A notice renamed in both `notices/resume.md` and the asker leaves the pinned list inside `tools/checks/resume-notices.ts` as the only stale thing: neither branch of the body is then true, no seat is harmed, and the remedy is to edit the check's own constants — the one remedy living in the reader's own repository. `resume-notice-absent` fires alongside but points at the document rather than at the list.

Where the three surfaces stand now, every one of them in akasha: the body is `pages/refusal/resume-notice-unasked.refusal.md`, still a two-branch disjunction with no third case. The document is `pages/notice/resume.notice.md`, named at `tools/audits/resume-notices.ts:10`. The asker is `tools/lib/supervisor-resume-notices.ts`, named at :12. The pinned constants are still pinned — `HANDED` at :14, `CLAUSE` at :19, `OPENING` at :21 and `ON_ROW` at :23. `pages/refusal/resume-notice-absent.refusal.md` stands beside it. There being one repository now, the clause about the remedy living in the reader's own repository is true of every remedy rather than of this one.

# Evidence

Established by the dispatched `review-instructions` seat reading the document on 2026-08-12, with the code repository checked out so the asker arm was live rather than skipped.

It did not add a third branch: the instrument settles that the case exists, but whether a refusal read by someone already blocked should carry a branch for a case where nothing is broken is judgment about the reader, and an add is the one act that grows what every reader pays for at boot.

Not measured: whether a notice has ever been renamed at both ends.
