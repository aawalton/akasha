---
id: 842f5d89-a736-5cdf-8345-11093a16b58c
page-type-slug: finding
title: "Location traces plugin free"
domain-slug: domain/atlas-app
---

# Claim

The location-traces server-side foundation for Atlas passive location tracking (a dedicated table, an owner-gated access boundary, and an ingestion endpoint) has an architecture settled by research and by principle, and the background-geolocation plugin is decided as the free @capgo option, chosen by Alan specifically so its fidelity limits can be observed before any spend on the paid @transistorsoft alternative.

# Evidence

Child of project #15549 ('where have I been' tracking). Row id 019f6930-9db8-7349-b120-da0d6e5dd261; its `notes` attribute was retired and this is what was moved off it.

INTENT SETTLED WITH ALAN (2026-07-16, dispatch-time): scope ALL THE WAY this pass — plan, build, and a TestFlight-installable build, not plan-only. Storage: a DEDICATED TABLE for GPS traces (Alan's explicit call), not public.pages, not the content storage tier; new-pattern approval for the dedicated table and the native background-location seam granted by Alan directly in intake.

RESEARCH SYNTHESIS (2026-07-16T04:40:35Z, worker-15551): architecture settled — new table public.location_traces, one row per GPS point, owner-gated RLS (user_id=auth.uid(), idle_saves/device_tokens template); columns cover position, motion, battery and device source. New access package @alanwalton/location-traces-access, cloned from @shared/metrics-access, plus a CI scanner. Ingestion via an atlas web route (modeled on api.places.add.ts), auth supporting webview cookie and native Bearer, strict Zod contract, RLS-scoped insert. Native seam: re-introduce apply-ios-seam.sh in atlas/native-shell (precedent: sibling native-shell).

PLUGIN DECISION (Alan via atlas, 2026-07-16T04:46:35Z): chose the free @capgo/background-geolocation over the $399 @transistorsoft alternative. Verbatim: 'I need to understand the limits of the free before committing to the spend.' @transistorsoft stays on the table as a later upgrade if @capgo's fidelity proves insufficient. Implication: a durable batch-upload buffer must be hand-built, with device_id + client_seq per point so drops and battery-vs-fidelity become observable evidence for that future call.

The row's own capture states it "ran past what this section holds" — the above is only the head of a longer capture.

Project #15551, domain atlas-app, someday_maybe. Carried no objective; captured but never defined. Moved off the retired `notes` attribute 2026-08-15.
