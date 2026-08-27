---
id: 8646fa6c-6217-5b68-8f20-6a31b679c924
page-type-slug: finding
title: "Backup mirrors deletions"
domain-slug: domain/global
---

# Claim

The seaweedfs bulk backup is a mirror rather than an archive. It runs `rclone sync`, so a deletion at source propagates to the backup copy on the next successful run, and the backup can only ever be as complete as the live bucket was at the last run. Its outage is currently the only reason data deleted upstream still exists in the backup, which means repairing the job destroys that data as its first act.

# Evidence

Measured 2026-08-04 against the live cluster.

`seaweedfs-backup-bulk` runs `rclone sync "src:$b" "/backup/$b"` for the buckets `loki-chunks`, `agent-sessions` and `headscale-db`. `rclone sync` makes the destination match the source, including deletions; `rclone copy` would not.

Source sizes, taken from the filer with `fs.du` rather than through the S3 gateway: `loki-chunks` 59,393 objects / 774,907,720 bytes (~739 MiB); `agent-sessions` 11,418 objects / 17,026,734,487 bytes (~15.9 GiB); `headscale-db` 146 objects / 620,605 bytes.

Destination sizes on the node-06 hostPath backing the `seaweedfs-backup` PV, read with `du`: `loki-chunks` 2.4 GB, `agent-sessions` 15.7 GB, `headscale-db` 896 KB.

The `loki-chunks` gap is roughly 1.7 GB held only in the backup. A `--dry-run` of the job's exact command reported "Skipped delete as --dry-run is set" for that bucket and for many `agent-sessions/*.jsonl` objects, so the deletions are what a successful run would perform.

The CronJob's last successful run was 2026-07-28T04:45:53Z, so the divergence has accumulated over seven days.

An earlier revision of this finding put the `loki-chunks` source at 66 objects / 7.419 MiB and the gap at 2.4 GB. Those came from `rclone size` through the S3 gateway, which truncates recursive listings — see the finding `s3-recursive-listing-truncates`. The direction is unchanged and the magnitude is smaller.

Not measured: whether any of the upstream deletions were intentional retention rather than loss; whether the `agent-sessions` deletions correspond to the agent-row hard-deletion reported separately on 2026-08-04; and whether any consumer treats this backup as an archive with a stated retention guarantee. The `_longtail` tree under the same PV is a separate copy-and-prune design and is not covered by this claim.
