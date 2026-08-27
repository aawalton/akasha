---
id: da01f043-9bab-576f-bcef-40bc893e8bca
slug: rotation-and-draw-disagree
page-type-slug: finding
title: "Rotation and draw disagree"
domain-slug: domain/book-of-everything
---

# Claim

The book's live rotation document and a quarantined ruling give opposite instructions on the same act, and the ruling exists in no other copy. `ROTATION.md` calls the unanswered China-to-755 probe a warm re-entry to "hand it straight back on return before it cools". The ruling says the opposite under the random-draw steer — offer resume-or-redraw at open, then draw if he redraws, because "the resume is a courtesy to a live thread, not a claim on it".

# Evidence

Read 2026-08-07. The rotation half stands as a document. `dirty/book-of-everything/ROTATION.md:129` reads: "China to 755's 221 BC before/after probe (`09/03/01-china-to-the-beginning-of-the-late-t-ang-ad-755`, opened this session, unanswered) — the live, unanswered probe … is a warm re-entry: hand it straight back on return before it cools." That file sits in the area `pages/domain/book-of-everything.domain.md` names.

The ruling half is not. It stands only at `dirty/skills/knowledge/rulings.md:57-59`, emptied as this is filed: "The warm re-entry that was never taken. A probe was delivered on China-to-755 and went unanswered. Under the random-draw steer the right move is to offer resume-or-redraw in one line at open, then draw if he redraws — the resume is a courtesy to a live thread, not a claim on it."

The steer it rests on is live machinery. `ops ali next-unscored --help` describes `--random` as "a uniformly-random unopened leaf (real OS entropy)" for "the audit sweep", the "disjoint complement of the rotation queue". So the draw and the rotation queue are two live pickers and nothing live says which wins when a warm thread is open.

Where I searched for a second copy: `rg -uuu` over `~/memory/findings/` for `warm re-entry|resume-or-redraw|redraw|china` returns four files, none about this; `rg -uuu` over `~/instructions`, `~/books`, `~/code` and `~/memory` for `resume-or-redraw` returned the quarantined line alone; the same search over this repository now returns this finding alone. The `-uuu` form was used because the verdict rests on finding nothing.

Not settled here: whether the practice is still wanted. The live interviewer tasks, both `reviewed-at: 2026-08-07`, describe a claim-and-correction session with no leaf, draw or rotation in it, and the last `profile.md` score write was 2026-07-08.
