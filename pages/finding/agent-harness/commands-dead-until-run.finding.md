---
page-type-slug: finding
title: "Thirteen ops verbs fail on every run while answering --help cleanly, the audit that found them having been removed for being red"
domain-slug: agent-harness
slug: commands-dead-until-run
---

# Claim

Thirteen ops verbs exit non-zero on every run, each loading a module from the code repository that no longer stands there. All thirteen answer `--help` with exit 0, so nothing tells them from working commands until one is run. The audit built to catch exactly this, `tools/audits/code-paths-resolve`, was registered on 2026-08-13 and removed on 2026-08-24 for being red, its own commit message promising restoration. It has not been restored, and reports 99 unresolved references today.

# Evidence

Measured 2026-08-26 over 17,387 TypeScript files in seven repositories. Every `codeModule` call site stands in `instructions`: 176 sites, 150 against the default code root, 69 distinct references, 18 of them broken.

Confirmed by running, not by reachability, which over-counts: a reach closure gives about 56 verbs, but five of those load behind `once(...)` on paths never taken and run clean. The thirteen that fail: `chess apply-move`, `chess evaluate`, `chess legal-moves`, `chess play`, `chess play-game`, `check-producer-barrel`, `check-deriver-barrel`, `audit rule-population`, `ali pending`, and `temper inventory capacity-audit`, `rules`, `plan`, `explain`. Exit 70 or 2. `--help` exits 0 for all thirteen.

`code-paths-resolve` was registered by `adc1051725`, survived the `tools/checks` to `tools/audits` rename, and was removed by `f181f4fdb6`, whose whole message reads: *code-paths-resolve does not run, and the two references it names stand unresolved until it is restored*. Nothing catches an orphaned audit; `checks-reached.ts` audits cluster-check registrations, not `tools/audits/*` absent from the `CHECKS` map. Run directly it takes 148ms and reports 99 unresolved references over a population of 803.

One of the thirteen, `temper inventory rules`, was repaired at `3ef01cd8a6` after this reading was taken; it exits 0 and the other twelve stand.

Three classes sit behind the count. Some modules moved to akasha, which `codeModule` cannot reach, joining its reference to the code root alone. Six are packages that exist and are linked but declare `exports` as `./*` with no `.` entry, so a bare specifier resolves to nothing. Thirteen further sites reach code-repository packages through a bare `import()`, bypassing `code-import.ts` and so invisible to this audit, against a Condition requiring every such load to come through it.
