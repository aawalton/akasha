---
id: ab06bb6e-463d-5b08-a09d-9426b91570aa
slug: buffer-content-tracker-suite-flaky-under-load
page-type-slug: finding
title: "Buffer content tracker suite flaky under load"
domain-slug: domain/code-editor
---

# Claim

The `terminalContrib/accessibility/bufferContentTracker` suite fails intermittently in `~/code-editor` under load, independently of what is being changed.

# Evidence

Measured by the seat delivering #18637, and reported to its lead rather than worked around.

It reverted its own change in its worktree, recompiled, and ran the suite six times at HEAD. It failed 3 of those 6 with the change absent.

The structural argument beside that measurement: the suite loads neither `terminalActions.ts` nor `terminalEditorService.ts`, and the only changed file it does load is `terminal.ts`, where the edit is an interface field — `TerminalEditorLocation` appears zero times in the compiled `terminal.js`.

The box ran at a load average of 54 to 81 throughout, most of it other agents' work, which is what makes this read as a flake under contention rather than as a defect.

NOT MEASURED: what in the suite is load-sensitive, or whether it fails on an idle box. Six runs at one load band is the whole of the evidence.

NOT MEASURED BY THE LEAD: this is the delivering seat's reading, recorded here because that seat has since stopped and the reading would otherwise have died with its hand-back. The lead confirmed only that the commit and its shape stand.
