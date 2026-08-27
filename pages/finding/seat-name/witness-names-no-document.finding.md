---
id: 7cad1657-d157-514d-a852-b214cec6c27e
page-type-slug: finding
title: "Witness names no document"
domain-slug: domain/seat-name
---

# Claim

The `instanced-seat` name family is held open by a retirement witness that names instruction documents existing nowhere in the estate, so the one family whose witness is a document can never turn false — the fossil its own design was written to prevent. Both it and `persona-campaign` now hold zero live agent rows.

# Evidence

Measured 2026-08-08 while ingesting `dirty/code/packages-alanwalton-personas-docs-instanced-seat.md`.

`packages/agents/shared/agent-name-families.ts:224-240` declares the family `contracting`, `retiredBy: 17330`, with `witness: { kind: "instruction-document", document: "the awen-* role documents, each prescribing <role>--<game>" }`. `INSTRUCTION_WITNESSED_SIZE = 1` at line 290 caps that kind at one, and this is the one.

No such document exists. `git ls-files` in `~/code` matching `awen-gm|awen-player` returns empty; `~/instructions` has no live `skills/` directory at all, and the only awen skills anywhere are `dirty/skills/awen-reviewer` and `dirty/skills/awen-turn-gate`, both quarantined and neither prescribing `<role>--<game>`.

The sibling shows what this one lacks. `persona-campaign` at 261-273 carries `witness: { kind: "in-repo", stillMinted: … parsePersonaCampaign("amy-calendar", …) !== null }`, and the comment at 336-343 states the intent: "the edit that empties it also turns the witness false — so the family cannot be left behind as a fossil reading as live." A document nobody wrote can never be read to turn one false.

Both families are already at zero. `ops seat list --all --limit 2000 --json` returns 903 rows, 610 named. Zero match `<persona>-<campaign>` against the fifteen `CAMPAIGN_TOKENS`. Zero match `<role>--<game-slug>`: the only three double-hyphen names are `claude-archivist--projects-build-singleton-deploy`, `claude-archivist--projects-build-parent-deploy` and `claude-archivist--lead-review-initiative`. 391 carry a `flex-<n>` segment, the composed shape `domains/seat-name.md` prescribes.

The specimen at line 235 is dead: `pages/finding/the-tower/action-routes-to-a-retired-seat.finding.md` records `awen-gm--the-tower` as a `retired` row whose `gm` is not a nameable role.
