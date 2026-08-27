---
id: f84d25aa-532f-5b05-939a-5c2e41cf1d7d
page-type-slug: finding
title: "Uinput privileged not mount"
domain-slug: domain/node
---

# Claim

On node-06, the ESO rig pod's ability to open `/dev/uinput` comes entirely from running `privileged: true`, not from the hostPath mount — nimue's three-arm test (2026-07-25) showed removing the mount changes nothing while removing `privileged: true` alone removes device access — so a uinput device plugin is a security-posture change (it lets the pod stop running privileged), not scheduling hygiene, and `/dev/uinput` is also the only 0600 device node on node-06.

# Evidence

From project #16211 (`node`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25, moved from retired `notes` 2026-08-15.

Goal as captured: advertise `/dev/uinput` as a schedulable resource on node-06 so the rig pod opens it without `privileged: true`.

nimue's three-arm test, 2026-07-25: remove hostPath mount → still works, decorative; remove `privileged: true` → no device, that's the grant. Second value: node-06 is the only node with the uinput module — a job scheduled elsewhere fails silently today; a plugin makes that scheduler-enforced.

Pattern to reuse: `synth.ts` already emits the NVIDIA device-plugin DaemonSet (kube-system, image pinned, `nodeSelector: {"nvidia.com/gpu.present":"true"}`, hostPath `/var/lib/kubelet/device-plugins`) — a uinput plugin is a second instance.

Open decision: generic device-plugin image (`squat/generic-device-plugin`, `--device` flag) vs. purpose-built. Dependency policy allows a pinned third-party image, so generic is compatible unless it can't express one character device cleanly. Node labels live in `nodes-main.ts`; node-06 has `kernelModules: ["uinput"]` under #16185; new label belongs beside `gpuHardwareLabels` (#16049).

Acceptance needs positive and negative control: requesting pod opens the device (observe effect, not exit code); non-requesting pod cannot; scheduler (not a hand nodeSelector) excludes nodes 01-05; `privileged: true` must be removed or the negative arm proves nothing.

Ground truth 2026-07-25 ~15:0xZ: `/dev/uinput` live on node-06 (`crw------- root:root`, mode 0600), module loaded. 0600 root-only may still require the container to run as root — check whether the cgroup grant suffices.

Depends on #16185 (durable IaC directive, hand-applied today). Related #15805, #15808.

aranya, 16:14:53Z, `talosctl ls -l /dev`: `/dev/uinput` is the only 0600 device node on node-06, other nodes as control — splits this into two decisions treated as one; note cut before naming the second.
