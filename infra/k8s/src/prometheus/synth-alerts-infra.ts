export const INFRA_ALERTS = `  - name: cert-and-storage-liveness
    rules:
      # Cert renewal wedged, read against the certificate's OWN renewal moment.
      # Each Certificate sets its own renewBefore, so a fixed days-to-expiry
      # threshold means something different for each one. This rule used to read
      # 21d-to-expiry on the premise that cert-manager renews at 30d out — that
      # is cert-manager's DEFAULT, not a property of any certificate. It fit one
      # of the three certs in the estate; the two cnpg-system barman certs set
      # renewBefore 360h and so sat inside the window for six days of every
      # cycle while cert-manager behaved exactly as configured, and a genuinely
      # wedged cert with a short renewBefore was indistinguishable from them.
      # certmanager_certificate_renewal_timestamp_seconds carries each cert's
      # own renewal moment on the same scrape target as the expiry gauge; past
      # it, cert-manager is behind on its own schedule whatever the renewBefore.
      # Same shape as CronJobStale, which derives each CronJob's tolerance from
      # its own timestamps rather than from a constant.
      #
      # The 6h grace is a property of cert-manager rather than of a certificate:
      # its renewal retry backoff caps near an hour, so a healthy renewal lands
      # far inside 6h and moves the gauge forward. time() comes first so $value
      # is seconds OVERDUE and positive — humanizeDuration on a negative renders
      # a negative duration into the page.
      - alert: CertManagerCertRenewalOverdue
        expr: time() - certmanager_certificate_renewal_timestamp_seconds > 6 * 3600
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "TLS cert {{ $labels.namespace }}/{{ $labels.name }} is {{ $value | humanizeDuration }} past its own renewal time"
          description: "certmanager_certificate_renewal_timestamp_seconds shows {{ $labels.namespace }}/{{ $labels.name }} (issuer {{ $labels.issuer_name }}) passed the renewal moment cert-manager itself set for it, and has stayed past it. That is this certificate's own schedule, whatever renewBefore it sets, so cert-manager is behind on renewing it. Check: kubectl describe certificate -n {{ $labels.namespace }} {{ $labels.name }}"

      # Escalation tier: most of this certificate's own renewal margin is gone.
      # The margin (expiration - renewal) IS its renewBefore, so this trips with
      # under a quarter of it left. For the 30-day margin the old rule assumed
      # for every cert that is 7.5 days to expiry — the old 7-day critical,
      # derived per certificate instead of hard-coded for all of them. A cert
      # with a 15-day margin trips at 3.75 days, the same fraction of the runway
      # it actually has. Both gauges carry identical label sets per certificate,
      # so the subtraction joins one-to-one without on()/ignoring().
      - alert: CertManagerCertRenewalOverdueCritical
        expr: certmanager_certificate_expiration_timestamp_seconds - time() < 0.25 * (certmanager_certificate_expiration_timestamp_seconds - certmanager_certificate_renewal_timestamp_seconds)
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "TLS cert {{ $labels.namespace }}/{{ $labels.name }} expires in {{ $value | humanizeDuration }} — under a quarter of its renewal margin left"
          description: "The renewal for {{ $labels.namespace }}/{{ $labels.name }} has been wedged long enough to eat three quarters of the margin cert-manager left itself (renewBefore), and expiry is now close — an outage of whatever this cert fronts is imminent. Check: kubectl describe certificate -n {{ $labels.namespace }} {{ $labels.name }}"

      # Explicit renewal failure. certmanager_certificate_ready_status has one
      # series per (cert, condition); condition="False" == 1 is cert-manager
      # actively reporting the cert not Ready (issuance/renewal error), a faster
      # signal than waiting for the expiry threshold. 15m clears the brief
      # not-Ready blip during a normal in-progress renewal.
      - alert: CertManagerCertNotReady
        expr: certmanager_certificate_ready_status{condition="False"} == 1
        for: 15m
        labels:
          severity: warning

      # Absent-metric guard for the cert-expiry path (mirrors
      # PostgresBackupMetricAbsent). If the cert-manager scrape drops or the
      # gauge disappears, the expiry rules above go silently blind — this fires
      # loud instead.
      - alert: CertManagerCertExpiryMetricAbsent
        expr: absent(certmanager_certificate_expiration_timestamp_seconds)
        for: 30m
        labels:
          severity: warning

      # SeaweedFS is the backup substrate: a dead volume server degrades PITR
      # coverage but currently surfaces only via the 26h-delayed
      # PostgresBaseBackupStale inference. This is the direct witness — Prometheus
      # scrapes the volume server on :9327, so up==0 means the blob store is down.
      # Dedicated + faster (for:5m) than the generic 10m TargetDown; 5m clears a
      # normal Recreate-strategy restart so a rollout does not false-fire.
      - alert: SeaweedfsVolumeServerDown
        expr: up{job="seaweedfs",component="volume"} == 0
        for: 5m
        labels:
          severity: critical

      # The master's own witness of volume-server liveness. The volume server
      # heartbeats the master every ~5s; SeaweedFS_master_received_heartbeats
      # {type="total"} is the cumulative counter, so rate==0 over 10m means the
      # master has stopped hearing ANY volume server — catching a volume server
      # that is up-for-scrape but wedged (not registering), which the up==0 rule
      # above cannot see. A <1m restart gap does not zero a 10m rate.
      - alert: SeaweedfsVolumeHeartbeatStalled
        expr: rate(SeaweedFS_master_received_heartbeats{type="total"}[10m]) == 0
        for: 10m
        labels:
          severity: critical

      # Absent-metric guard for the SeaweedFS liveness path. If the master scrape
      # drops, the heartbeat rule goes blind — this fires loud instead.
      # SeaweedFS_master_is_leader is a stable single-series gauge (==1) on the
      # master target, so its absence means the master metrics scrape is dead.
      - alert: SeaweedfsLivenessMetricAbsent
        expr: absent(SeaweedFS_master_is_leader)
        for: 30m
        labels:
          severity: warning
`
