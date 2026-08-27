---
id: f0038526-00b1-54c4-b563-6291ed345127
slug: floors-checked-rather-than-made-impossible
page-type-slug: finding
title: "Floors checked rather than made impossible"
domain-slug: domain/global
---

# Claim

The dependency-floor gate checks after the fact a class the doctrine could make impossible. A port keeps upstream's `AddOnVersion` and upstream's floors verbatim, so floor equals shipped by arithmetic rather than by accident — and 22 of the 43 in-fleet floors sit at exactly `floor === shipped`. Where one number is copied into two hand-kept places, a gate comparing them is the cheapest guard available; where it is generated from one, the class cannot arise and the gate has nothing left to guard.

# Evidence

Raised by Alan on 2026-08-10 while settling `check-addon-dependency-floor` KEEP — the gate stands here, scripted at `temper/shared-build-deploy-checks/src/check-addon-dependency-floor.ts`, registered at `tools/lib/check-workflow/check-configs-addons-runtime-gates.ts:15-22` and paged at `pages/cluster-check/cluster-check-addon-dependency-floor.cluster-check.md`: he suspects the class could be prevented structurally for our own addons rather than checked for afterwards. Filed rather than acted on, the design being nobody's yet.

What the review measured, which I read rather than re-ran. The gate has refused nothing in its whole life: 112 runs over seq 25759 to 27400, 2026-07-25 to 2026-08-08, of which 103 completed and none failed. It costs 0.12% of a pipeline at a 541 ms median, never holding a run open alone. It compares 43 of 111 declared edges, the rest being bare names or external providers, and 22 of those 43 floors sit at zero headroom, so one `addonVersion` edit is the whole distance to a violation.

Why the doctrine is the lever. The rationale prose is off disk — it stood in the code repo's `packages/temper/addons/CLAUDE.md`, survived only in the instructions repo's `dirty/` at `e4992998f^`, and stands in no tree here — and it states the invariant deliberately: a port keeps upstream's `AddOnVersion` and upstream's floors verbatim, "so floor equals shipped by arithmetic, not by accident. That is deliberate." An invariant held by convention across two hand-edited manifests is exactly what a generator holds for free. The gate still reads each floor off disk — `join(addonDir, "addon.json")` at `check-addon-dependency-floor.ts:29` — and no module writes an `addon.json`.

What the gate would still owe if the class were prevented. It compares in-fleet floors only, so a floor naming an external provider is already outside it; that half is unaffected by generating our own.

Not established. Whether the ports' manifests could be generated from the upstream copies they track without losing something the hand-kept form carries, and what a generated manifest would cost at the point somebody deliberately wants a port to diverge from upstream. Nobody has designed this; the finding records the suspicion and the numbers under it.
