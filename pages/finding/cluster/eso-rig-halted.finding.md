---
id: 576c65ce-37e8-5765-aa47-9c804d52bc7a
page-type-slug: finding
title: "Eso rig halted"
domain-slug: page-type/cluster
---

# Claim

In the cluster domain, no persistent agent-driven ESO game client exists for hands-off in-game addon testing. As of 2026-07-24 feasibility had been confirmed (ydotool injection spine, free cluster GPU capacity, an uinput kernel-module path for Talos), but ESO's login flow — email access codes keyed to IP/hardware/local-state fingerprint — was an unproven load-bearing unknown. The project was stopped by Alan's full-project halt on 2026-07-25.

# Evidence

Source: project #15804 (someday_maybe, live-on deploy, domain cluster), captured notes only, no objective, moved off the retired `notes` attribute 2026-08-15. Coordinated by nimue (top-level, per Alan 2026-07-24).

Goal: a persistent, agent-driven ESO client in a GPU container on Talos; end-state wired into CI (deploy addon → auto reload → read results → pass/fail). Scope fence: non-gameplay client ops only; dedicated expendable account (tempereso) only.

Feasibility confirmed 2026-07-24: (1) workstation ydotool /dev/uinput injection proven, bypassing the KDE Wayland consent gate that blocks xdotool. (2) 4 of 6 cluster nodes free of GPU contention; RTX-2060-Super-class ample. (3) uinput is an in-tree Talos module, addable via machine.kernel.modules (packages/infra/talos/src/build-patch.ts +schema.ts +nodes-main.ts), applied via `talosctl patch --mode=auto`; game-in-container was greenfield.

Slices: S1 uinput=Aranya, S2 container=nimue+worker, S3 install PVC ~100GB=Aranya, S4 login/launch=nimue+worker (critical-path risk), S5 addon test=Ember, S6 CI=Dalla.

S4 de-risk scout (2026-07-24T15:08): (1) ESO ships Taneth, a headless Lua test framework (CPU only) — much addon testing may not need the live client; routed to Ember to size how much. (2) Headless render doable via Xvfb+VirtualGL/EGL, not gamescope-headless (NVIDIA cursor bug). (3) Launcher: run eso64.exe directly; patch state snapshotted to the PVC. (4) Login = hard part: access codes tied to IP/hardware/local-state fingerprint; the unknown was whether a pinned-IP + persistent-volume container skips the code on cold restart — to be proven cheaply (S4a) before automation. (5) Ban-risk step-up vs the workstation case, judged low given no kernel anti-cheat; PTS preferred.

Related, tracked separately: ground-layer #15805 (Aranya), GPU-rig pod build #15808, and the node-03 fleet-resilience gap it surfaced, #15849 (node-03 locked).

Capture cut at a paragraph boundary; the above is only its head.
