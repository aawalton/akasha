---
id: 62cffa48-6ac9-5474-b498-6575fed21206
slug: handle-inbound-names-no-instrument
page-type-slug: finding
title: "Handle inbound names no instrument"
domain-slug: page-type/task
---

# Claim

`tasks/handle-inbound.md` names no instrument, and three of its terms resolve to nothing on the perimeter.

# Evidence

Reported by the archivist reviewing the file on 2026-08-04, and checked against the corpus in that pass.

"the approval gate" at line 24, "a warm resume" and "her standing conventions" at line 28 each appear in this file and nowhere else on the perimeter. `ops seat gate-block` is the plausible referent for the first, and `ops memory` for the others, but nothing states either.

The task defers throughout to "your binding", and no surface is that binding: `roles/handler.md` carries a definition line and nothing else — no responsibilities, no tasks. Its sibling tasks at the root of `tasks/` each name their instruments.

The generality may be deliberate: the live code calls its extractor handler-agnostic and two handlers share it. So the open question is whether the concrete instruments belong in this file or in a per-handler surface that does not yet exist, and that is a judgment the reviewing seat declined rather than one it could settle.

Not measured: whether any handler runs this task today, and whether a per-handler surface was ever drafted.
