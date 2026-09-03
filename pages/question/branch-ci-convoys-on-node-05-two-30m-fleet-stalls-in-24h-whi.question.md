---
page-type-slug: question
id: 019f6e92-0990-763b-9e00-b782ed3993df
title: "Branch CI convoys on node-05 (two 30m+ fleet stalls in 24h): which lever do you want for making a second node fit branch pipelines?"
slug: branch-ci-convoys-on-node-05-two-30m-fleet-stalls-in-24h-whi
status: answered
source-context: "019f32ef-e6a8-7901-be4e-da4e54f6b6c6"
asked-by: 019f22ad-945f-7a99-8f94-02bc3813d6bc
options:
  - "A: Move standing residents off node-01 or node-04 to free >=8Gi (node-02 at 54% / node-03 at 35% have room) — I'll scope the move for your approval before touching anything"
  - "B: Add RAM to node-01/04 (hardware path, your call entirely)"
  - "C: Approve per-step placement semantics (light steps may run off-pin on smaller nodes; heavy steps keep the fitting node) — engine change, I'll spec it for review first"
  - "D: Accept the convoy as-is (FIFO drains correctly; cost = occasional 30m latency spikes when megapods stack)"
answered-at: 2026-07-17T06:32:57.089Z
---
No changes for now, we wait when the valid nodes are busy
