---
id: a13385e7-43ba-5fcf-ad28-4a6f596351b8
page-type-slug: ops-command
title: "Ops tracking air-quality"
slug: ops-tracking-air-quality
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/air-quality.ts
path: tracking air-quality
---

# Definition

- **Ops tracking air-quality** — the current air reading for a location, and the outdoor-exertion verdict drawn from it.

# Help

Fetch the current air quality for a location (default Provo, UT) and report a conservative OUTDOOR-EXERTION verdict. The reading is the US AQI on EPA 2024 breakpoints from the keyless Open-Meteo Air Quality API, with the dominant pollutant and per-pollutant sub-indices. The verdict is a hard medical gate on outdoor exertion (Alan's asthmatic bronchitis): `indoor-only` on PM2.5-driven Moderate-or-worse air or any Unhealthy-for-Sensitive-Groups+ reading, `caution` on non-particulate Moderate air, `clear` on Good air. A deterministic read — no DB write, no flaky page scrape.
