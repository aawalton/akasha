---
id: aee40526-20cc-55d9-92d6-ecc7a14a4b0c
page-type-slug: old-ops-command
title: "Ops mobile sim push-tap"
slug: ops-mobile-sim-push-tap
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/sim/push-tap.ts
path: mobile sim push-tap
irreversible: true
---

# Definition

- **Ops mobile sim push-tap** — a push delivered to the sim, its banner tapped, and the trace the launch sealed printed.

# Help

Deliver a push to the sim and TAP its notification banner, so a tap→answerable reading can be taken on demand instead of waiting for Alan to tap one. Defaults to a COLD launch: terminates the app, verifies it is actually gone (a push racing a live app yields a warm reading wearing a cold label, so the precondition is checked rather than assumed), pushes, then taps the banner from a session that is not bound to the app — an app-bound session dies with the app it was created for. Prints the sealed trace entries as JSON. Seed the identity first with `ops mobile sim open-url --as-real-user <route>`: the sim's default throwaway account is RLS-blind to every owner-owned page a push targets, so without it every reading terminates `not-found`.
