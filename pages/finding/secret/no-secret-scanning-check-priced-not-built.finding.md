---
id: a7e2a894-0bbe-5e6a-8273-c758f490cdab
slug: no-secret-scanning-check-priced-not-built
page-type-slug: finding
title: "No secret scanning check priced not built"
domain-slug: domain/secret
---

# Claim

No secret-scanning check exists anywhere in packages/infra/checks/checks/, so the invariant that no credential lands in the repo rests entirely on agent judgement, and a diff-scoped, issuer-namespace-only check with an explicit false-positive policy was priced by dalla but not built.

# Evidence

Project #16270, domain `secret`, status someday_maybe, tag author:nimue, owner dalla. No objective written; title: no secret-scanning check exists at any rung — "no credential lands in the repo" is carried entirely by agent judgement.

Filed at dalla's request, homed to her; pricing below is hers.

THE GAP: no secret-scanning check anywhere in packages/infra/checks/checks/ — not a weak one, none. Rests entirely on agent judgement, the costliest and least repeatable rung available.

HOW IT SURFACED: upstream Claude Code 2.1.219 added a pre-push secret-review duty to its prompt (#16252 diff). Nimue called adopting that prose SKIP — weakest rung for what a check can enforce deterministically. Dalla agreed: "adopting the upstream prose would have felt like doing something while changing nothing."

DALLA'S PRICING: (1) scan the diff not the tree — "a tree scan becomes a tax every pipeline pays forever and gets suppressed within a month." (2) earliest rung: a check in packages/infra/checks, not a deploy gate. (3) state the FP policy before code — "a scanner that cries wolf gets allowlisted into uselessness... appearance of a control with none of the effect." (4) bound the claim.

PROPOSED FP POSTURE (nimue, for dalla to accept/amend/reject): match only issuer-namespaced formats (sk-ant-, AWS AKIA, GitHub ghp_/github_pat_, PEM headers, Supabase JWTs) — near-zero natural FP rate. No entropy heuristics (fires on hashes/fixtures/UUIDs/lockfile hashes), no keyword-proximity (password=; fires on tests/docs). Must not fire on SOPS ciphertext. Fire on clean diff = rule defect, fixed in rule, never allowlist.

WILL NOT COVER: credential already in history; a file the diff doesn't touch; a bare-password/no-namespace credential; anything outside the checked path. Closes accidental paste of a known format only — not a guarantee no secret is present.

RELATED: #16176 (suppressions record a reason but no expiry) — the FP-allowlist failure above is that class early.
