---
id: 7bd7659b-49bd-522f-afcd-ddb16ecf77c2
slug: child-suppression-unobserved-live
page-type-slug: finding
title: "Child suppression unobserved live"
domain-slug: domain/global
---

# Claim

No child project has completed since the guard went live, so the suppression it exists to perform has never been observed on a real row.

# Evidence

The guard landed on `main` at `2d0791b` and went live at 2026-08-13T00:57:34Z. Project #18932's third criterion asked for the live reading and only half of it could be taken.

The half that was taken is the singleton arm. Closing #18932 itself — a project carrying no parent — minted `#18932 No child project's completion reaches Alan's phone` at 2026-08-13T02:04:23Z, through the deployed guard. So the change demonstrably does not suppress everything, which is the failure that reads from outside exactly like success.

The child arm has had no traffic. The last `project-completion` page naming a child predates the deploy; at the verdict the `apns_push_log` ledger's last `project.done` claim and the `apns-push-notifier.project-done` subscriber cursor both did too, and no children were in flight. The worker is alive: its sibling subscribers on the same handle processed events after the deploy.

The unit suite does carry the case — running it shows `child project; no mint` beside mints for a parent and a singleton, 91 tests passing — so what is missing is the observation on a live row rather than any evidence that the guard is wrong.

What settles it: a child project reaching done with no `project-completion` page naming its seq. The weaker reading is that no page minted after 2026-08-13T00:57:34Z names a project carrying a parent.

The domain's Intent entry waits on this. An intent leaves once it is true, and this one wants rewriting into Design as a departure once a child has been seen suppressed; the T1 docblock in `packages/alanwalton/apns-push-notifier/src/producers.ts` says `whose intent is` and wants changing in the same act.
