---
id: 7fe0906e-f601-5fef-8b8a-4bd7e66a1345
slug: collectors-overwrite-warm-capture
page-type-slug: finding
title: "Collectors overwrite warm capture"
domain-slug: domain/temper
---

# Claim

Four Temper saved-variable collectors — collectCadwell, collectZoneCompletion, collectPointsOfInterest, collectMotifKnowledge — overwrite their stored value on every cold API scan with no guard and no merge, so a cold scan can destroy a warm capture built by a previous login (self-healing on the next warm login, but leaving a transient window in which any upload reflects the wrong, cold-sliced answer).

# Evidence

Project #16112, domain `temper`, status `someday_maybe`, `live-on: deploy`, no objective ever written; text below is the row's capture, moved off its retired `notes` attribute 2026-08-15.

Found while fixing #16073 (the nine blanket existence guards). Sibling class, not the same failure mode — a follow-up candidate, not triaged.

The four: collectCadwell, collectZoneCompletion, collectPointsOfInterest, collectMotifKnowledge, in `packages/temper/player/completion/addon/src/tracking/`. Each does `charEntry.<key> = scan<Domain>()` with no guard and no merge, inside the same 3000ms `zo_callLater` after `EVENT_PLAYER_ACTIVATED` (main.ts:117-148) as the nine #16073 converted.

Why it may matter: all four enumerate (a GetNum*/GetNext*Id walk), so they can answer short against a cold API exactly like the nine #16073 fixed. Because they overwrite rather than guard, the failure inverts: instead of freezing a cold sliver forever, a cold scan destroys a warm capture a previous login had built. It self-heals on the next warm login — transient, strictly better than the #16073 class, which is why it was left out of that project's scope.

Open question: whether transient is good enough — a sliver uploaded between the cold login and the next warm one is still a wrong answer downstream, unmarked as provisional. Needs the same per-collector triage #16073 ran.

Evidence basis: verified by reading all four `collect*` bodies at commit 3e601d97d7 plus the two #16073 commits; none carry a `!== undefined) return` guard, which is why the #16073 grep population (9 sites / 8 files) never included them. Recorded in `packages/temper/addons/docs/saved-variables-freshness-patterns.md` under "Rescan-and-Overwrite Pattern", flagged "enumerations — not audited".

Not established: whether any of the four actually answers short in-game; no ESO rig exists. The claim is structural, the same evidentiary basis #15947 and #16073 used.
