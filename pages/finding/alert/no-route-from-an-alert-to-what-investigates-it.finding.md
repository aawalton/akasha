---
id: 07d49fd1-6cff-55eb-a57c-ea5b7c0cc738
page-type-slug: finding
title: "No route from an alert to what investigates it"
domain-slug: page-type/alert
---

# Claim

An alert document names the condition and nothing about how to investigate it, so a seat woken by one has no route to the verb built for exactly that question. `ops loki kernel` exists to settle whether an OOM was real or merely unobserved, and no alert about an OOM names it.

# Evidence

Measured 2026-08-15 while reviewing `ops loki kernel` under the `review-command` task.

The verb is unreachable except by browsing. A search across every `.md`, `.ts`, `.sh` and `.service` file in the instructions repo for `loki kernel` or `loki/kernel` returns only the verb's own two files. Nothing schedules it, nothing invokes it, and no document points at it.

The alerts that would want it are bare. `domains/alerts/kubepods-slice-oom-kill.md` and `domains/alerts/container-oom-killed.md` are eleven lines each, carrying frontmatter and a single Definition bullet. `kubepods-slice-oom-kill-metric-absent.md` and `kubepods-oom-collector-stale.md` are the same shape.

The verb's own help block argues the case the alerts leave unanswered: "'no OOM in the kernel log' is not 'no OOM'. It is 'no OOM in whatever window the capture could observe'." A seat triaging one of those four alerts without this verb reads a quiet kernel log as a clean node, which is the exact inference the verb was built to refuse.

`page-types/alert.md` states nothing about investigation. Its Design and Intent cover routing, firing sites and event records; its body shape offers Definition, Design, Intent, Principles and Rules, none of which is where a route to an instrument would sit.

What is unmeasured: how many of the other alert documents have an instrument that answers them, and whether the right repair is a section on the alert, a link from the namespace, or something else entirely.
