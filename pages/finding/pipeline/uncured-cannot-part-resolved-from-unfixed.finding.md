---
id: 831ac0e7-50da-5c72-9cb9-f411cdebe54b
slug: uncured-cannot-part-resolved-from-unfixed
page-type-slug: finding
title: "Uncured cannot part resolved from unfixed"
domain-slug: page-type/pipeline
---

# Claim

A main failure dispositioned through the resolve path is reported `uncured`, a state it can never leave, so permanent residue reads exactly like a failure nobody has fixed yet.

# Evidence

Noticed on 2026-08-10 off a main-pipeline failure alert for 27573, which cured on retry while it was being read. The eight older uncured rows beside it are the subject.

WHAT CURED MEANS, from the verb's own help: a success at the same seq following the failure. Its two sources are an events log at seven days and a metrics store at a month, and both were in range for all eight.

WHAT WAS MEASURED, by a delegate, so the counts are its reading rather than mine. Every main pipeline row was pulled and partitioned by status. The eight reported uncured are exactly the `resolved` rows in that window, one to one, nothing else in the set. Nine cured rows checked as controls all sit at `completed` with every workflow completed, which is what an in-place retry leaves. The eight sit at `resolved`, their failed workflows and steps still resolved.

WHY THAT IS PERMANENT. A resolve produces no same-seq success, so nothing can ever satisfy the cure predicate for those rows. They cannot leave the list, and the list grows monotonically with rows that will never clear. A genuine open failure is reported in the same word.

IT IS NOT A LIVE FAULT. Every distinct failing step among the eight has since run green on a later main pipeline, and the pattern stops at 2026-07-28: 263 main pipelines from there to 27573 with no further resolved row, while red mains continued and each was cured by retry.

WHAT IS NOT ESTABLISHED. Why any of the eight failed — events retention begins after all of them, no log streams survive, and no failure reason is persisted on any step, so only exit codes and durations could be recovered. Whether `resolved` was the right disposition was not asked; this claim is about how the reading reports them.
