import {
  ALERT_COLLECTOR_STALE,
  ALERT_SLICE_OOM_KILL,
  ALERT_SLICE_OOM_KILL_ABSENT,
  METRIC_HIER_OOM_KILL,
  METRIC_LOCAL_OOM_KILL,
  PROM_FILE_PATH,
} from "./kubepods-oom-constants"

export const COLLECTOR_STALE_SECONDS = 300

export const OOM_WINDOW = "1h"

export const KUBEPODS_OOM_ALERTS = `  - name: kubepods-slice-oom
    rules:
      # THE TRIPWIRE. ${METRIC_LOCAL_OOM_KILL} counts only OOM
      # kills charged to the kubepods slice's OWN limit — the parent slice itself
      # breaching — and reads 0 on every node while healthy (fleet baseline: 0 on
      # all 6 nodes).
      #
      # A ROLLING WINDOW, NOT the raw counter. The counter is cumulative and
      # clears only on node reboot, so a bare \`> 0\` would fire on "a slice kill
      # happened at some point since this node booted", NOT on "the dangerous
      # configuration is in effect now". Those come apart at the worst moment:
      # after an operator does exactly the right thing and reverts the raise, a
      # raw-counter alert KEEPS FIRING until the node reboots — and an alert whose
      # correct response does not silence it is an alert people learn to mute.
      # increase() makes "fixed" representable: once the kills stop, it clears.
      #
      # 1h is chosen, not defaulted: (1) it matches the sibling ContainerOOMKilled
      # in synth-alerts.ts, which uses increase(...restarts_total[1h]) > 0 on the
      # same subject class, keeping the OOM-detection vocabulary consistent;
      # (2) it is sized against the FIRING path (measured accurate to ~3 min),
      # NOT against resolve-notification latency, whose timestamps measured 6.7h
      # skewed and are therefore unusable as a sizing input.
      #
      # NO \`for\` delay (0m), deliberately. This alert is EVENT-shaped: the kill
      # has ALREADY HAPPENED, so there is no condition to confirm over time and a
      # \`for\` could only postpone the alert. A long \`for\` on an event-shaped
      # alert is how a tripwire ends up firing after the incident it exists to
      # prevent.
      #
      # NO keep_firing_for either. ContainerOOMKilled needs one because its
      # condition flickers as pods churn; increase() over a kernel-maintained
      # counter is smooth and cannot flicker, so a hold would only extend the
      # window without buying anything.
      #
      # NOT the hierarchical counter (${METRIC_HIER_OOM_KILL}) — that one also
      # counts every descendant's own-limit kill, i.e. every routine container
      # OOM, which ContainerOOMKilled already covers. See the module header for
      # the measured evidence behind the split.
      - alert: ${ALERT_SLICE_OOM_KILL}
        expr: increase(${METRIC_LOCAL_OOM_KILL}[${OOM_WINDOW}]) > 0
        for: 0m
        labels:
          severity: critical

      # ABSENCE GUARD (#14219). The tripwire above is quiet-while-healthy by
      # design, so a lost series is indistinguishable from health at the alert —
      # absence of the trip would silently stop meaning anything. This is the
      # deliberate absent() guard that keeps the quiet honest. 15m clears a
      # scrape blip and a node-exporter DaemonSet rollout without false-firing.
      # It catches the series VANISHING; it cannot catch a stale series still
      # being served — that is the staleness rule below.
      - alert: ${ALERT_SLICE_OOM_KILL_ABSENT}
        expr: absent(${METRIC_LOCAL_OOM_KILL})
        for: 15m
        labels:
          severity: warning

      # COLLECTOR STALENESS — the PRIMARY liveness signal, and the only one that
      # sees a dead collector behind a live series. node-exporter keeps serving
      # the last textfile it globbed off the shared emptyDir, so a dead sidecar
      # leaves absent() silent and the counter frozen at its last value, which
      # reads exactly like a healthy 0.
      #
      # mtime is the right witness because it advances UNCONDITIONALLY: the
      # collector rewrites the file every 30s whether or not anything OOMed. The
      # hierarchical counter cannot serve here — it only proves the reader alive
      # WHEN IT MOVES, so on a quiet fleet it sits static and stops distinguishing
      # "no kills occurred" from "the collector died", failing on exactly the
      # quiet stretch where the reassurance matters most.
      #
      # It also composes with the collector's skip-write-on-read-failure: a failed
      # read leaves the old file in place rather than writing a false zero, so
      # mtime freezes and this fires. ONE signal covers both collector death and
      # persistent read failure.
      #
      # NO \`for\` — do not re-add one. mtime only advances when the collector
      # writes, so this expression is MONOTONIC between successful writes: it
      # grows continuously, crosses ${COLLECTOR_STALE_SECONDS} exactly once, and stays crossed. It
      # cannot oscillate the way a sampled gauge can, so a \`for\` buys no flap
      # protection. The ${COLLECTOR_STALE_SECONDS}s threshold IS ALREADY the persistence
      # requirement (10 consecutive missed 30s cycles); a \`for: 5m\` on top would
      # demand an already-persistent condition persist a second time and double
      # time-to-detect to 600s — a long time not to notice a dead safety instrument.
      #
      # AND IF IT FLAPS, THAT IS THE DIAGNOSTIC, NOT A DEFECT. A steady fire means
      # the collector is DEAD; a flapping fire means it is DEGRADED BUT ALIVE —
      # still writing, just slower than ${COLLECTOR_STALE_SECONDS}s. Different faults, different
      # remedies, and the alert's shape separates them for free. Adding a \`for\` to
      # "fix" the flap would erase the distinction.
      - alert: ${ALERT_COLLECTOR_STALE}
        expr: time() - node_textfile_mtime_seconds{file="${PROM_FILE_PATH}"} > ${COLLECTOR_STALE_SECONDS}
        for: 0m
        labels:
          severity: warning
`
