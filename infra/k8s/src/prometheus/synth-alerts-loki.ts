export const LOKI_ALERTS = `  - name: loki-health
    rules:
      # The anti-regression guard for #16370 itself, and the one rule TargetDown
      # structurally cannot replace. TargetDown compares up==0, so it needs an
      # up series to exist; if the loki job is removed from the scrape config
      # there is no series at all and TargetDown is silent. That is not
      # hypothetical — it is the exact state this system sat in until #16370:
      # Loki unscraped, and nothing anywhere said so. absent() is the only shape
      # that catches a monitoring gap rather than a monitored failure.
      #
      # Empty-while-healthy by design (#14219's deliberate-absent() carve-out),
      # verified returning 0 series while the job is live.
      - alert: LokiScrapeJobAbsent
        expr: absent(up{job="loki"})
        for: 30m
        labels:
          severity: warning

      # Stream cardinality is the canonical leading indicator for Loki's memory
      # failure mode: an unbounded label (pod name, request id, timestamp) sent
      # by a shipper multiplies streams, and the ingester holds each one in
      # memory. This is what #16247 needed and did not have — the container
      # metrics said a pod was restarting, only this says why.
      #
      # 10000 is ~5.2x the measured 1917 peak (1810 median over 35 samples), so
      # organic growth does not reach it while a real cardinality explosion —
      # which multiplies rather than creeps — passes it within minutes.
      # Emittability proven per #14219: the threshold-lowered variant
      # (> 100) yields 1 live series, so the rule is quiet, not dead.
      #
      # for: 30m clears the post-restart rebuild ramp. A fresh ingester
      # repopulates from empty (observed climbing 268 -> 907 over 13 minutes),
      # and that ramp is normal recovery, not cardinality growth.
      #
      # max by (tenant) is load-bearing, not cosmetic: the scrape job sets pod
      # and instance labels that change on every Loki restart, and the bridge
      # dedups on all labels except pod/uid — without this aggregation each
      # restart would mint a fresh alert envelope.
      - alert: LokiIngesterStreamsHigh
        expr: max by (tenant) (loki_ingester_memory_streams{job="loki"}) > 10000
        for: 30m
        labels:
          severity: warning

      # Hard failures on the log path. Loki degrading is doubly expensive: this
      # system loses log ingestion AND loses the tool used to diagnose the loss.
      #
      # A ratio, because 0.3 errors/s means something very different at 6 req/s
      # than at 600. Per #14219 every ratio carries an absolute floor, so the
      # second conjunct requires real error volume — without it a single failed
      # request on an idle Loki reads as a 100% error rate.
      #
      # route!="ready" is load-bearing. Measured: the ONLY 503s Loki emitted
      # were on the readiness endpoint during startup (the other 5xx were 3 on
      # query_range). Readiness probes failing while a pod boots is correct
      # behavior, so without this exclusion the rule fires on every Loki restart
      # and trains exactly the blindness it exists to prevent.
      - alert: LokiRequestErrorRateHigh
        expr: (sum(rate(loki_request_duration_seconds_count{job="loki",status_code=~"5..",route!="ready"}[10m])) / sum(rate(loki_request_duration_seconds_count{job="loki",route!="ready"}[10m])) > 0.05) and on() (sum(rate(loki_request_duration_seconds_count{job="loki",status_code=~"5..",route!="ready"}[10m])) > 0.05)
        for: 10m
        labels:
          severity: warning

      # Ingest-path latency, scoped to push only. The push path should be
      # uniformly fast (measured p99 20ms); ad-hoc query latency is legitimately
      # variable with the range and matcher a human types, so alerting on it
      # would be noise. Distinct from the error rule: a backed-up ingest path
      # slows long before it fails, and sustained push latency means Promtail
      # backpressure and eventual log loss.
      #
      # 1s is ~49x the measured p99, deliberately far clear of normal so this
      # marks genuine degradation rather than a busy minute.
      - alert: LokiPushLatencyHigh
        expr: histogram_quantile(0.99, sum by (le) (rate(loki_request_duration_seconds_bucket{job="loki",route=~"loki_api_v1_push|/logproto.Pusher/Push"}[10m]))) > 1
        for: 15m
        labels:
          severity: warning
`
