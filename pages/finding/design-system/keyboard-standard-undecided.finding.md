---
id: ba8e2851-d148-5896-9837-60bec987849f
page-type-slug: finding
title: "Keyboard standard undecided"
domain-slug: domain/design-system
---

# Claim

The design-system domain has no cross-house keyboard-control standard: CTRL+X/C do not cut/copy blocks, End does not jump to a field's end, blocks cannot be multi-selected, and CTRL+Enter binds two conflicting actions (submit vs toggle-collapse). A three-layer authority model (L0/L1/L2) and resolutions for each item were drafted with Alan, 2026-07-24, but none is built.

# Evidence

Source: project #15792 (someday_maybe, live-on deploy, domain design-system), captured notes only, no objective, moved off the retired `notes` attribute 2026-08-15.

Scope settled with Alan 2026-07-24: Olwen owns the standard (a design-principles doc + a shared keyboard primitive: hook + components); domain owners (Astra/Pages System, Ember/Temper, Atlas/Atlas) own per-app adoption.

Source: the keyboard cluster in Astra's alanNotes (persona page 019f1412-b223-74d5-93f3-d09bf6d6107f): CTRL+X/C don't cut/copy blocks; End doesn't jump to field end; no block multi-select; CTRL+Enter collides (toggle vs submit) — flagged as the first real key-binding call for Alan. Alan's own note: "Standardized keyboard UX."

Three layers to cover: text nav, block ops, modifier gestures. Deferred second-pass candidates (undecided): date/time format, no-layout-shift-on-Tab, custom-display audit seam, web/mobile parity.

FRAME (Olwen, 2026-07-24T13:51): three-layer authority model minted with Alan — L0 reserved/parity-mandatory (clipboard, undo/redo, select-all, save, find, caret nav); L1 conventional (Cmd/Ctrl+K palette, Ctrl/Cmd+Enter=submit, "?" sheet, "/" menu, g-then-letter); L2 house language (app-specific, discoverability must be built). Lowest-layer sufficiency principle pending Alan's confirmation at full generality.

Resolutions drafted, not built: block cut/copy/paste extends native L0 X/C/V onto the block selection; Home/End get L0 caret/doc-edge behavior; Ctrl+Enter=submit wins (L1-claimed), toggle-collapse moves to a clean L2 key.

Capture was cut at a paragraph boundary; the above is only its head.
