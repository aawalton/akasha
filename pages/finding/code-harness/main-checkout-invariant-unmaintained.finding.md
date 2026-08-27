---
id: 449ea363-fc89-5bbd-a89e-6d29d40ef0d3
slug: main-checkout-invariant-unmaintained
page-type-slug: finding
title: "Main checkout invariant unmaintained"
domain-slug: domain/global
---

# Claim

The deploy's launcher preflight rests on an invariant nothing maintains — that `~/code`
"never carries its own commits" and so is only ever behind `origin/main`, never diverged.
The invariant was observably false on 2026-08-04, and the verbatim remedy the preflight
prints cures only the behind case. For a diverged checkout the estate offers no verb an
agent may run.

# Evidence

Measured 2026-08-04, re-derived against what stands after the direct-landing bypass and
its rules were retired. The apparatus that made the divergence routine is gone; this is
the half that does not depend on it.

`packages/alanwalton/projects/cli/src/pure/decide-stale-launcher-checkout.ts:18-20`:

    `~/code` is a clean checkout of `main` that is only ever fast-forwarded — it
    never carries its own commits — so its HEAD is always at or behind
    `origin/main`, never diverged or ahead.

The whole preflight reduces to `git merge-base --is-ancestor origin/main HEAD` on the
strength of that sentence. Nothing maintains it. The only guard is
`block-direct-main-writes.sh`, which judges `Write`/`Edit` tool calls rather than commits
and exits 0 outright while `$HOME/.allow-direct-main` stands.

It has been false. On 2026-08-04 `~/code` main stood 88 ahead and 82 behind `origin/main`,
of which 65 commits had patch-equivalents upstream and 24 did not.

The printed cure does not reach that state. `STALE_LAUNCHER_REMEDY` is
`git -C ~/code fetch origin main && git -C ~/code merge --ff-only origin/main`, described
in source as "the exact remedy an agent runs". Against a diverged tree `--ff-only` refuses
by design, and `move-to-deploy-ff-settle.ts` treats a clean-tree non-fast-forward as
"nothing transient to wait for — fail loud immediately".

No verb closes it. `ops project sync` and `ops project rebase` act on project worktrees,
not `GIT_REPO_DIR`. `git reset` is a verb-only block in `block-destructive-git.sh`, so no
agent may run it through the Bash tool. The divergence above was in fact retired by
`reset: moving to origin/main` at 12:01:50 — an act available to Alan and to no agent.

NOT MEASURED. How often `~/code` sits on a project branch rather than main; whether any
non-agent path still commits there.
