---
id: 36995950-aa57-5e49-9f9a-4d05311d7344
slug: zimage-vram-arbitration-missing
page-type-slug: finding
title: "Zimage vram arbitration missing"
domain-slug: domain/global
---

# Claim

The three ComfyUI daemons (upscale, wan, zimage) that share the workstation's one 16 GB RTX 5080 have no cross-process VRAM arbitration, so an idle-but-resident daemon can starve another daemon's run even though the unload primitive each process exposes already exists.

# Evidence

Project #16076, domain `infra`. Found by sophia while closing the workstation leg of #16046; this row added one refinement to her diagnosis. Carried no objective; notes only.

INCIDENT: `upscale-seedvr2.sh` exit 1 was not a code defect. The zimage daemon had been up 3d20h holding 11,284 MiB of 16,303 MiB, last generating ~12h earlier. With ESO also resident, only 1,275 MiB was free against a ~7.2 GB recipe. `bun ops zimage down` freed it to 12,578 MiB and the run completed first try in 31.45s. Verified independently: `nvidia-smi` read 3,450/16,303 MiB used, matching sophia's post-fix figure; port probe confirmed 8677 (upscale) up, 8676 (wan) and 8678 (zimage) down.

STRUCTURE: the three daemons are designed to co-reside (`packages/infra/zimage/CLAUDE.md:61` documents the port layout: 8676/8677/8678). Each keeps its model resident by design and shares one 16 GB card that also hosts ESO.

REFINEMENT: the unload primitive already exists — `comfy-client.ts:302-316` implements `POST /free` (`unload_models` + `free_memory`). So this is not "build VRAM management"; what's missing is the arbitration layer above it — no daemon knows the other two exist, and nothing calls `/free` on an incumbent when a new tenant needs the card.

SAME CLASS as the node-06 finding on #16046 (a different machine): a resident tenant nobody accounts for, on an unarbitrated resource, producing a failure that presents as the victim's bug.

CROSS-INSTANCE FRAMING (sophia, adopted by the author, superseding the author's own idle-TTL proposal which was withdrawn): the gap is specifically cross-instance — ComfyUI's own pressure-eviction operates within one process, so no per-daemon tuning helps. Idle-TTL was withdrawn as violating Consume on Demand and as not covering a busy (non-idle) incumbent.

OPEN, undecided: lock/lease vs on-demand `/free`-before-run vs one collapsed service. Idle-TTL was proposed, then withdrawn.
