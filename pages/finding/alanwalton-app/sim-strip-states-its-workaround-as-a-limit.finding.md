---
id: 6116c05f-63d7-500b-a4c3-01f5acd7d6ed
slug: sim-strip-states-its-workaround-as-a-limit
page-type-slug: finding
title: "Sim strip states its workaround as a limit"
domain-slug: domain/alanwalton-app
---

# Claim

`build-sim.sh` strips the widget appex from every simulator install, and its own header states the strip is necessary because the installer rejects a null `CFBundleVersion`. That rejection follows from the script never setting `CURRENT_PROJECT_VERSION`, which the widget's `Info.plist` templates `CFBundleVersion` on. The simulator can install a widget; the script's comment is what says it cannot, and that belief has propagated into a standing finding.

# Evidence

Measured 2026-08-08 from `~/code` and `~/instructions` by the ingest-instructions seat emptying `dirty/code/packages-alanwalton-native-shell-claude.md`.

Three interlocking facts. `packages/alanwalton/native-shell/scripts/build-sim.sh` lines 116-120 test `[ -d "$APP/PlugIns/ValuesWidgetExtension.appex" ]` and `rm -rf` it from the installed bundle, unconditionally. `rg -c "CURRENT_PROJECT_VERSION"` over that script exits 1 — it never sets the value. `packages/alanwalton/native-shell/ios-widget/Info.plist:16` is `<string>$(CURRENT_PROJECT_VERSION)</string>`, so an unset value is what leaves `CFBundleVersion` empty.

The script's prose states the constraint as a property of the simulator rather than of the invocation. Line 15 lists the appex as "stripped from the built bundle before install"; lines 21-22 and 117 give the reason as the installer rejecting the null `CFBundleVersion`. The executable strip and the comment above it agree, which is the outcome nobody investigates. Only the archive path sets the value, at `packages/alanwalton/mobile-cli/src/lib/deploy-script.ts:89`.

That the belief spread is checkable and it has. `pages/finding/readouts/widget-slug-maps-bound-to-nothing.finding.md` rests part of its claim on it, saying a drift lands "on Alan's device alone, where no CI step and no simulator can see it".

Nothing refuses this. `ops enforcement list` returns 242 entries; the only two touching this area, `check-shellcheck` and `check-widget-bucket-color-mirror`, refuse nothing here.

Not measured: no simulator install was re-run with the value set, so that the install then succeeds with the widget in place is taken from `~/instructions` commit `3c7ab2628` rather than observed here. What is established is that the script still strips, still never sets the value, and still states the constraint as the simulator's.
