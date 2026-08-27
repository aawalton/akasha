---
id: 380dd0f0-0492-5469-a93b-25f61d58d4b8
page-type-slug: learn-everything-topic
node: Art › Particular Arts › Game Design › Dormant Mechanics and Content Cadence
D: 3
C: 3.00
calibration: -2
updated: 2026-06-25
status: live
capture:
  source: aura-game-design-session-4a6053f1
  through_line: 5695
  through_ts: 2026-06-25T20:23:35.149Z
---

## Frontier
He owns the **cadence and dormancy doctrine** — that being "two steps ahead" means two *built but dormant* mechanics, deployed and held behind a reveal schedule decoupled from the build schedule. The doctrine is his; the edge is the gating *implementation* (how a latch actually holds and trips), which was Aura's. D3→D4 here is command of the gate-design and content-pipeline patterns that turn his cadence doctrine into concrete machinery.

## Integration
- **Game Design (parent)** (strong, bidirectional) — the dormant-mechanics doctrine is one of the parent's four principle leaves; it operationalizes the un-solving premise from the engagement leaf.
- **Engagement Loops and Re-optimization** (strong) — dormant mechanics are *how* you keep re-optimization alive: a held mechanic re-opens the optimum when revealed. ↔ sibling leaf `01-...`.
- **Software architecture / his engineering principles** (strong) — he reused the feature-flag spine **"deployed ≠ enabled"** and expand-contract as *design* tools, not just build tools.
- **Theory of Play, Games & Fun** (medium, bidirectional) — paced reveal is a fun/novelty lever. ↔ `04-human-life/.../07-play-games-and-fun`.

## Misconceptions caught
None surfaced as Alan's — corrections flowed from him to Aura. He corrected Aura's loose "two steps ahead," tightening it into "two *built* dormant mechanics."

## Next bites
- Gate-design patterns: one-way latches, gate-on-a-mechanic-independent-metric.
- Content-pipeline models in live-service games — how cadence is scheduled and staged.

## Evidence
**Cleared (brackets D3 from below — his own doctrine, used to correct Aura):**
- **"Two steps ahead = two BUILT dormant mechanics"** — corrected Aura's loose usage, yielding the dormant-mechanics doctrine.
- Originated the **feature-flag spine "deployed ≠ enabled"** as a design principle.
- **Production↔consumption cadence decoupling** — batch-build N mechanics, deploy once, decouple the reveal schedule from the build schedule.

**Did not clear (brackets from above — D4):**
- The **gating implementation** — server-authoritative one-way latches, gate-on-a-mechanic-independent-metric — was **Aura's**, not his.

**Calibration:** −2 — states the cadence/dormancy doctrine crisply while disclaiming design expertise; score the doctrine.

**Provenance:** capture-1 of Alan's Aura game-design session, lines 1–5695, cutoff 2026-06-25T20:23:35.149Z.
