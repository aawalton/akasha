---
id: 9c6ec1e6-01d2-52b1-982c-fbbd7b42624a
page-type-slug: finding
title: "Standing condition announced once"
domain-slug: domain/global
---

# Claim

An alert condition that starts and never clears is announced once and then goes silent, so the longer something is wrong the less likely anyone is to hear of it.

A new alert identity delivers; a continuing one does not, and not even a Prometheus restart that resets the alert's own `activeAt` produces a second notification. Nothing distinguishes a condition that ended from one that is still true and has stopped being mentioned.

# Evidence

Measured 2026-08-11 at 07:00Z over `public.messages`, matching on the `infra_alert` payload. The bridge's records begin 2026-08-04 18:22:28 and hold 147 messages in total.

THE CASE. Three JobFailed alerts stood firing against `registry/registry-gc`, `pod-janitor/pod-janitor` and `cloudflared/ddns-headscale`. The same three workloads were recorded firing on 2026-08-04 and were still firing when read on 2026-08-11 — seven days.

THE DELIVERY RECORD. `JobFailed` has 6 firing and 2 resolved messages in its entire history. Grouping every alert delivered in the twelve hours to 07:00Z returns no `JobFailed` row at all, over a window in which three were continuously firing.

THE RESTART DID NOT REARM IT. The Prometheus pod started 2026-08-10T22:58:31Z and the three alerts carry an `activeAt` of 22:59:13.986008324Z, identical to the nanosecond — fresh from Prometheus's view. No message followed. So whatever suppresses the repeat sits above Prometheus's own alert lifecycle.

THE CONTROL. At 06:59:40Z a JobFailed for namespace `jobfailed-probe-18706` was delivered within a minute of the Job failing. That instance differs only in carrying a NEW identity, which is what separates it from the three that were silent.

THE SAME SHAPE ELSEWHERE, from the same grouping: `WorkerSupervisorCpuPressureHigh` shows 1 resolved and 0 firing, and `QuerySustainedMeanBudgetExceeded` shows 4 resolved against 2 firing. Resolutions arrive for conditions whose onset never did.

CONFIRMED CLEANLY. Seven days firing with no notice sent; all three resolutions arrived at 08:20:53Z once #18706 cured them.

NOT MEASURED. The mechanism. Alertmanager's `repeat_interval` and the infra-alert-bridge's dedup were not read, so which of the two suppresses the repeat is not established — only that the repeat does not arrive. Whether any alert has ever been delivered twice for one continuous episode. Whether the three were continuously firing for the whole seven days or fired, cleared and refired unobserved.
