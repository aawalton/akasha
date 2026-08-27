---
id: e2cbe5ad-f888-56b7-a9fe-f24d38b6af8c
slug: crash-telemetry-frames-truncated
page-type-slug: finding
title: "Crash telemetry frames truncated"
domain-slug: ios-app/alanwalton-ios
---

# Claim

Native-crash telemetry for the alanwalton iOS shell captures only abort-machinery stack frames, discarding the app frames that would name the bug, and does not record which build crashed (`releaseSha` is null on native-crash rows), so diagnosing a native crash currently requires the user to file an Apple crash report by hand.

# Evidence

Filed as project #15976 (domain alanwalton-ios). Found by the #15934 project's worker (2026-07-25), routed as bigger than its project. Our native-crash telemetry proved a crash class and could not name a culprit, so Alan had to file an Apple crash report by hand before #15906 could be diagnosed.

Evidence, from #15906: error page `019f764f-01a2-72e7-935f-b074ce44cdad`, kind=native-crash, fingerprint `08bb7d8efec4a42a`, count=4 since 07-18. Entire stored stack: 8 frames, all abort machinery (`libsystem_kernel.dylib`, `libsystem_pthread.dylib`, `libsystem_c.dylib`, `libc++abi.dylib` x3, `libobjc.A.dylib`) — zero app frames, zero AVFoundation frames. For an uncaught-ObjC-exception crash the abort path is always the top of the crashing thread, so this reliably captures the least informative frames. Apple's log for the same crash carried the answer at frames 3 and 8: `AVAudioEngineGraph::Initialize` raising from `KokoroTtsPlugin.resumeInternal()` — our capture had none of it.

Two cheap defects: (1) frame truncation — MetricKit supplies the full call-stack tree, we persist only the top frames; establish where truncation happens (payload capture / api/errors boundary / error_capture proc) and retain enough depth for app frames (app frame was at index 8 here, but pick depth from data, not one sample); (2) `releaseSha` is null on native-crash rows — we cannot tell which build crashed; worker-15906 had to read the build number out of Apple's log. Thread the shell's own runtime build number through.

Why it earns its place: the crash pipeline exists so Alan doesn't have to notice, reproduce, and report; right now it detects a death and hands diagnosis back to him.

Also recorded: two Apple-side API facts (crash-submissions list endpoint sorted by createdDate, and per-id crashLog endpoint) making a same-day pull cheap as a secondary source, not a substitute for our own capture working.
