---
id: 8eb5f789-01a9-59a0-bb69-6aec0d3d9b88
slug: captionless-ring-drops-its-label
page-type-slug: finding
title: "Captionless ring drops its label"
domain-slug: domain/ring
---

# Claim

`domains/ring.md` states the figure's label stands below it always. `SurplusRing` and, since #19349, `SafetyRing` draw no label when the payload carries no caption, and the ring grows into the space it would have taken. `UpkeepStoplightsWidget` instead falls back to the habit key and always draws something. Three rings, two behaviours, and nothing says which is intended.

# Evidence

Both optional-caption rings pass their caption into `RingCaption.text`, and `Ring` draws the caption only where one is present, so an absent caption removes the label rather than substituting anything.

Reported on 2026-08-18 by the seat on #19349, which met this while giving safety's caption the shape surplus already had. The `safety-level-small-no-caption` render case was added and blessed for both apps in that project, and both references show a captionless ring drawn larger than its captioned sibling.

Not repaired there, on the ground that it is unreachable from production: both safety feeds send `label`, deployed since #19302, so no phone reaches the state. A fallback added for it would be a literal nothing exercises, and a stale one would be invisible.

Not measured by me: whether `domains/ring.md`'s `always` was written before the optional caption existed or in spite of it, which decides whether this is the line to change or the rings. Not checked: whether any ring outside these three takes an optional caption.
