---
id: a713823b-9b2c-56d1-85e2-46dbcc5497fd
page-type-slug: finding
title: "Unlanded row reads as shipped"
domain-slug: domain/global
---

# Claim

A `live-on: deploy` project can reach `awaiting_lead_verification` with nothing landed on main, and no instrument says so. The lead gate demands a green full branch CI verdict and admits a pre-land one by design, so it passes such a row without comment; the row's own `deploy` attribute is empty and the status column reads the same as a row that shipped. The lead is left to notice by hand that the work is on a branch.

# Evidence

#18163 arrived at `awaiting_lead_verification` on 2026-08-09 with `custodyTransfer` reading `{"fromStatus":"implementation","toStatus":"awaiting_lead_verification"}` and `deploy` empty. Its three commits — `2b0b0f5099`, `6c8dcf9891`, `77b6c3b7bc` — were on `origin/project-18163` and on no other branch; `git branch -r --contains 77b6c3b7bc` named that branch alone. Its build task, `build-singleton-deploy`, puts `deployment` at stage five with `verification_postdeploy` and `documentation` after it, so the row went from stage two to stage eight.

The three sibling rows closed the same day each carry a full `deploy` history with a `merge-queue` merge: #18183 at `0355c72f78`, #18164 at `b3d29fb7fd`, #18191 at `b85ec9b798`. #18163 alone carries none, and nothing distinguished it on any listing.

It was not caught. I verified it, ran its suites in a worktree, found 24 pass and 0 fail, and wrote a verdict holding the row against a prediction about the next nightly sweep. That prediction could not have come true: the sweep clones `main`, and main carried none of the work. The recorded note said that if the sweep's count did not move, the clones had not landed and the manifest was where to look — which would have sent the next reader to the wrong place on a row whose real fault was that it had never shipped.

`ops project move-to --help` states that gating belongs to transfers rather than stages, and that `deployment` is gated on nothing. That is a reasoned design and this is not an argument against it: a refusal would be wrong, because the lead gate contemplates a legitimate pre-land arrival. What is missing is a report. The fact is already on the row, in a field a listing could project, and the lead's own task asks them to observe what a change does rather than what it says — which is exactly the observation a lead reading a status and a document does not make.
