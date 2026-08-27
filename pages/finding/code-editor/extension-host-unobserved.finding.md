---
id: fc2afa85-88f9-5a00-bf4b-7bc323b21886
slug: extension-host-unobserved
page-type-slug: finding
title: "Extension host unobserved"
domain-slug: domain/code-editor
---

# Claim

Nothing in the editor repository observes extension-host behaviour, so any criterion about what an extension actually draws can be settled only by Alan looking at it.

# Evidence

Three projects delivered on 2026-08-12 ended at the same boundary, each having said so plainly rather than implying otherwise.

#18927 settled a right-click menu against the shipped manifest and the workbench source that reads it, and nobody saw the menu render. #18928 and #18929 settled two tree panels against the corpus, the harness verb and a manifest test, and nobody saw a container draw or a row open its file. #18931 settled a terminal's placement against the `vscode.d.ts` contract and against `showSeat`, which already places transcripts by the same mechanism, and nobody saw a terminal appear in an editor group.

The reason is structural rather than anyone's omission. The extension's suite is bun-only and no test in the tree imports `vscode`, so no extension host runs. `tools/gate.sh` does drive a served workbench, but it is scoped to the workbench's own legibility checks and asserts nothing about what an extension contributes.

Two further constraints narrow it more than a missing harness would. `tools/promote.sh` drives the SERVED build while Alan runs the DESKTOP build, a headless drive of which does not render — filed separately as `desktop-drive-headless.md`. And some extension paths cannot safely be driven at all: #18931 found that exercising its own change would run `cr <name>`, which performs `ops seat takeover` and would stop whichever seat held that session.

What this costs is small per project and compounds. Each of the four surfaces above reaches Alan already believed correct, and the first reading anyone takes of it is his. The seats are handling it well — manifest tests that fail when an id is mistyped, mutation-tested assertions, pure functions either side of the untestable wiring — and every one of those closes the failure that is silent rather than the one that is visible. A mistyped view id shows as an empty panel with no error anywhere; that is now caught. A panel that draws its rows wrongly is not.
