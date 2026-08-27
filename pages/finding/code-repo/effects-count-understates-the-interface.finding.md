---
id: bad0fe81-861c-5e0a-a679-74eca0f84cca
page-type-slug: finding
title: "Effects count understates the interface"
domain-slug: repo/code-repo
---

# Claim

The hourly-confirmation reactor's header states a count of its own injected effects that is wrong about the interface directly beneath it: it says four, and `HourlyConfirmEffects` declares six. The two extra are `readOpenBlock` and `deliverToAmy`, and `deliverToAmy` is the whole of the free-text branch — the one outcome the reactor leaves unstamped because an application is still owed. A reader taking the count from the header would not know that branch has an effect at all.

# Evidence

Read in `~/code` on `main`. The file is `packages/alanwalton/daily-tracking-worker/src/hourly-confirm-subscriber.ts`, tracked — `git ls-files` returns it.

The header above the interface opens "The four effects the shell performs, injected so the run is observable." The interface immediately below it declares six members: `readQuestion`, `readOpenBlock`, `closeBlock`, `openBlock`, `stampReconciled`, `deliverToAmy`.

Six is the live number, and the shell uses all of them. `reconcileHourlyConfirm` calls `fx.readQuestion`, then `fx.readOpenBlock`, then dispatches on the decision: `segment` calls `fx.closeBlock`, `fx.openBlock`, `fx.stampReconciled` in that order; `stamp` calls `fx.stampReconciled`; `deliver` calls `fx.deliverToAmy`.

The header's own third numbered property describes the free-text branch — "only the free-text branch leaves it unstamped, because there an application really is still owed, by Amy" — so the same header both describes that outcome and omits its effect from the count it opens with.

The quarantined head document was right where this header is wrong: `dirty/code/packages-alanwalton-daily-tracking-worker-claude.md` said `reconcileHourlyConfirm` "performs them through six injected effects". That document is emptied and removed by the instruction sweep, so the correct count survives only here.

Nothing reports this. No check resolves a count written in prose against the type below it, and the file typechecks either way — the number is not read by anything.
