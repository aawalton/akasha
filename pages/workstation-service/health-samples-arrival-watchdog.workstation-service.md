---
id: 01a06096-02f3-7c01-bc6c-7a22c017d022
page-type-slug: workstation-service
title: "Health samples arrival watchdog"
slug: health-samples-arrival-watchdog
domain-parent-slug: domain/alan-harness-services
required-reading-slugs:
  - page-type/workstation-service
runs:
  - timeout 120 bun services/health-samples-arrival-watchdog.ts --notify
enabled: true
schedule: "*:17"
catch-up: true
start-timeout-seconds: 300
---

# Definition

- **Health samples arrival watchdog** — the service that rules on whether Alan's health readings are still arriving and tells him when they stopped.

# Design

Whether the stream is still posting is read from when a reading last arrived, never from which days carry data, because a day holding no reading and a day Alan did not move read alike.

The bound is seventy-two hours, measured off the arrival record rather than chosen: the longest gap between arrivals while the stream was healthy was forty-two hours, and forty-eight would have fired on gaps that may have been a quiet weekend.

What this writes is a notification, and reaching a device is the push notifier's.

The newest arrival already said is latched under `/var/tmp`, so one silence is stated once rather than every hour, and a reboot costs one repeat.

It reads the day files of one checkout, and that checkout is the only place these rows exist: the pod's is reset onto origin/main at every start and nothing there commits, so no reading accumulates in it. Silence here is therefore real silence rather than a partition.

What it cannot say is which of the phone, the POST and the writer stopped, since all three read alike from the rows, and the check writes that reach into its own answer rather than leaving the next reader to find it.

A silent stream exits nonzero, so the unit goes red as well as saying so.

# Intent

The service runs.
