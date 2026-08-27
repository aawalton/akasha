---
id: 1a00cc79-553a-5f31-8351-0959b203fd74
page-type-slug: finding
title: "Alert prints the baseline not the anomaly"
domain-slug: domain/global
---

# Claim

The PostgresStorageGrowthAnomaly alert prints the seven-day BASELINE rate as though it were the rate that triggered it. PromQL `and` yields the left operand's value, and the baseline term is leftmost in the chain, so `$value` is the normal rate rather than the anomalous one.

The number it shows is therefore always the small one, and always reassuring: a reader who takes it at face value concludes the growth is negligible at exactly the moment the alert is telling them it is not.

# Evidence

Measured 2026-08-11 at 06:20Z against the live Prometheus.

THE DEPLOYED EXPRESSION: `deriv(pg_database_size_bytes[1w]) > 0 and deriv(pg_database_size_bytes[1d]) > 2 * deriv(pg_database_size_bytes[1w]) and deriv(pg_database_size_bytes[1d]) > 10 * 1000`. The summary renders `{{ $value | humanize }}B/s`.

THE READINGS, taken together within a minute:

- `deriv(pg_database_size_bytes[1d])` = 25,740 B/s — the anomaly, about 2.2 GB/day
- `deriv(pg_database_size_bytes[1w])` = 710 B/s — the baseline
- the whole alert expression evaluated = 710.4 — the baseline

So `$value` is the leftmost operand, and the figure delivered is 36x smaller than the condition that fired. The two alerts received tonight said "63.02B/s" at 00:59Z and "700.7B/s" at 01:42Z; the second matches the 7-day derivative read independently minutes later.

IT WORKS ON READERS. On receiving the first, this seat recorded that 63 B/s was "tiny" and a ratio alert on a near-zero denominator, and deferred it. That reading was wrong and the alert was right, and nothing in its text could have corrected it.

THE UNDERLYING GROWTH IS REAL AND LARGELY TRANSIENT, established separately so the reporting defect is not confused with an incident. `events` hypertable chunks dated 2026-08-09 and earlier are compressed at 88–152 kB each; those dated 08-10 and 08-11 are uncompressed at 48, 87, 247, 368 and 470 MB. The database is 15.46 GB, of which `pages` is 7 GB.

NOT MEASURED. Whether event volume itself rose or only the compression lag, which the compressed chunks cannot answer without their pre-compression sizes. How long the alert has misreported — the expression's shape is not new, so it is likely every firing it has ever had. Whether other alerts in this repository chain `and` the same way and inherit the same defect; only this one was read.
