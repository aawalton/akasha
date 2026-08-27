---
id: c365042c-b459-512b-a6cc-b731dddcea55
slug: report-carries-a-second-noun-sense
page-type-slug: finding
title: "Report carries a second noun sense"
domain-slug: domain/instrument-answer
---

# Claim

`report` was landed as one of the two values of `instrument-answer` without anyone measuring what the word already carries, and it carries a second entrenched noun sense: the written document a seat produces at the end of a run. `Plain Or Declared` exempts a declared word only in its declared sense, so those uses are now off-sense.

# Evidence

Measured 2026-08-15 across `domains` and `page-types`, the same day `ruling` and `report` landed and `verdict` and `reading` were removed.

89 files use `report` in some form, against 18 for `ruling`. Every target value landed that day was collision-counted before Alan ruled on it — `case` at 38 files was accepted deliberately as the term of art, `store` at 37 was checked sense by sense and then dropped for other reasons — but the two answer values were never counted, and the argument put to Alan for preferring them over `verdict` and `reading` was that the retired pair collided.

The colliding sense is a document rather than an answer. Sampled noun uses: "The report is `~/agents/<name>/review-<subject slug>`", "into a report at `~/agents/<name>/ingest-<source slug>`", "the report is all a seat st[ands on]", "treat a report written against the version you replace". Each names a file a seat writes, which is neither an instrument's answer nor produced by an instrument at all.

The verb is not the problem. `Report only what you verified` and `Report what is wrong with the verb rather than repairing it` are verb uses — a different part of speech, cleared by the same argument that cleared `state`.

`ruling` collides more mildly and in a closer sense. `domains/tasks/ops/review-command.md` says "Alan's ruling on the namespace lines", which is a decision by a person rather than an instrument's answer.

What is unmeasured: how many of the 89 are the verb, and whether the right repair is renaming the document sense rather than the answer.
