---
id: 9173f1d2-9be2-5893-8eee-ce6585fa23fd
slug: resume-notice-absent
page-type-slug: refusal
title: "Resume notice absent"
holes:
  - key
---

# Refusal

`pages/notice/resume.notice.md` declares no `{key}`, or declares it empty. It is one of the two notices the supervisor hands a seat whole — `restart-immediate` and `restart-deferred`, the pair `HANDED_NOTICE_KEYS` names — and one of the three keys `ResumeNoticesZ` requires, the third being `restart-recovery-clause`, which is allowed to be empty and these two are not.

The composition is all or nothing. `parseNotices` refuses when any one of the three is missing or fails its shape, and `unavailable()` then answers with a single diagnostic line written into all three — so a seat put back to work receives that line in place of every notice, not just the one that went missing.
