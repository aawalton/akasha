---
id: 66081512-360e-5864-b819-2b03eca78313
page-type-slug: finding
title: "Review reads findings and files none"
domain-slug: domain/global
---

# Claim

`review-check` tells a reviewer to grep the findings store and states outright that a review writes
nothing, so every reading pays for the store and none of them adds to it. Not one finding in the
estate was raised by a `review-check` reading.

# Evidence

`domains/tasks/code-harness/review-check.md` as it stands on 2026-08-06, read whole:

- Stage 1's **Grep** bullet spends the reviewer on the memory repo's `findings/` and the instructions
  repo's `dirty/`, warranted by "a review that rediscovers a filed defect has spent itself" — which
  holds only where earlier readings filed.
- Stage 3's **Feed** bullet states "A review writes nothing", and its four control routes exist to
  give a reviewer a control without a write.
- Stage 6's **Hand** bullet names one output: a recommendation to the lead.
- No stage names `ops memory file-finding`. The word `finding` appears once, as the folder name at
  stage 1.

Measured against the store on 2026-08-06. `grep -rn "Raised by" findings/check/ findings/code-check/
findings/code-harness/` returns seven provenance lines and every one names a `review-instructions`
reading of `domains/check.md`, `domains/code-check.md` or `domains/code-harness.md`. None names a
`review-check` reading. There is no `findings/review-check/` directory, and `grep -rn "review-check"`
across `~/memory/findings` returns two files, both citing the task rather than filed by a reading of
one.

Readings have run: `pages/finding/identity/composed-name-cannot-part-two-seats.finding.md` records two
`review-check` seats dispatched on 2026-08-05, one per specimen.

`domains/tasks/archivist/review-instructions.md` also names no filing act, and filed all seven anyway.
What `review-check` adds is the sentence saying a review writes nothing.

NOT MEASURED. Whether the two seats of 2026-08-05 found anything worth filing, or completed. Whether a
lead acting on a handed-up recommendation files instead. Which repair is right.
