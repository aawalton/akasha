---
id: 86be275b-aa6e-5c4a-a85e-e13dc1a947ee
slug: cut-automation-unrefused
page-type-slug: finding
title: "Cut automation unrefused"
domain-slug: domain/ios-install
---

# Claim

Nothing in the instructions repo, and no mechanism `ops enforcement list` names, states or refuses that a TestFlight cut must not be automated. The act stands as a dispatched task and the Apple daily-cap reason as CLI help; `ops mobile cut-status --help` reports "auto-deploys are off", a description that goes stale rather than refusing anything. Alan's ruling saying so was cut from quarantine, recoverable at `4add19e9e2`. An automatic post-land cut existed before and was removed.

# Evidence

`rg -uuu -il "testflight"` over `domains/`, `tools/`, `notices/`, `settings/` returns one path, `domains/tasks/ios-install/ship-install.md` (exit 0), whose stage 3 is "Run `ops mobile deploy-testflight --wait`". Neither it nor `domains/ios-install.md` says a cut may not be automated. `ops enforcement list` names 232 mechanisms; filtering for testflight, mobile, cut, deploy or install leaves `check-postinstall` and `block-addon-direct-install.sh`, neither about cuts.

Recoverable at `4add19e9e2`, which cut it from `dirty/code/packages-alanwalton-native-shell-docs-production-build.md`: "**Automatic TestFlight cuts are OFF (Alan's standing ruling; Apple daily cap), so cuts are made intentionally by agents**". Its message records that wrapper removed at #15085 phase 0. `23229b7b0` cut the same territory from a second quarantined document.

The substance is live, but only as description. `mobile-cli/src/mobile/cut-status.ts:10-13`: "auto-deploys are OFF ... the detector reports a fact; a human decides when to cut", and line 42 puts it into `ops mobile cut-status --help`. The reason is live twice: `deploy-testflight.ts:69` ("consumes no App Store Connect daily upload slot") and `:269` ("an irreversible ASC daily-cap slot consumed"). `domains/code-quality.md` bars an instruction from living in a code comment, which is where this now sits.

Both seats searched phrases the live code does not use. Over `packages/alanwalton/mobile-cli/`, `rg -i` for "daily cap", "standing ruling", "cuts are made intentionally" and "automatic cut" each exit 1; a bad path on the same command exits 2.

One premise in `4add19e9e2` is false: `domains/ios-install.md` "was reviewed by its owner on 2026-08-07 without one". That file carries `reviewed-at: 2026-08-06`, its last commit `1f0b75579` dated 2026-08-06; `ship-install.md` carries 2026-08-07.

Not measured: whether Alan still holds the ruling.
