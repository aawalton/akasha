---
id: d0389c38-0ecf-52f5-830b-c111c64a9c12
slug: load-smoke-verdict-pure-core
page-type-slug: finding
title: "Load smoke verdict pure core"
domain-slug: domain/temper
---

# Claim

The S6 load-smoke verdict — TemperErrors zero-fresh keyed on post-deploy build id, plus UI-present and SavedVariables round-trip, reduced to a three-valued (ATTRIBUTED / SET-LEVEL / CLEAN) per-addon result — is a pure data transformation over a SavedVariables blob, an error table and a build id, so its decider and control-list requirements are buildable and unit-testable now, independent of the rig chain that the effectful driving shell still depends on.

# Evidence

Project #16221, domain `temper`, `someday_maybe`, captured but never defined.

S6, the actual product of the rig programme: an `ops`-style verb driving deploy -> `/reloadui` -> collect, returning a structured per-addon verdict. Upstream work (uinput, image, storage, install, cold->in-world) is substrate.

Verdict, per ember on #15872: per addon = TemperErrors zero-fresh (keyed on post-deploy build id) + UI-present + SavedVariables round-trip. Build-id keying is load-bearing: without it a stale error and a fresh one look the same, so "zero errors" can't tell clean from stale.

Why it splits: the verdict is pure — a blob, an error table and a build id, pass/fail/unknown needs no game/rig/GPU/account, so it's unit-testable now, ahead of the rig. Execution (driving the client, `/reloadui`, reading results) needs the rig, stays blocked. Build the pure core now; wire the shell when the rig lands.

Three-valued verdict, central to the milestone: ATTRIBUTED (addon X named), SET-LEVEL (unattributable), CLEAN. Collapsing SET-LEVEL into either neighbour is a defect — CLEAN hides breakage, ATTRIBUTED blames an innocent addon; unattributed is what a cascade looks like (A breaks, B-F downstream), likeliest and costliest to misattribute.

The control, mandatory, first to build: a smoke collecting nothing and one over clean addons both report zero errors, so pass and instrument-failure look alike unverified. Required before trust: (1) a broken addon must report ATTRIBUTED; (2) an inventory assertion failing loud on zero examined (ember's bundle-scan fix, same shape); (3) a build-id staleness check — mismatch means UNKNOWN.

Scope: IN — pure decider/types, three-valued shape, unit tests, CLI surface/output. OUT — driving the client, input injection, anything needing the rig (wires on with S2/S3/S4b).

Evidence grade: verdict shape is ember's, sourced; the split and control list are the author's own design, analysis not measurement — no smoke harness existed at filing.
