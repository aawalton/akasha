---
id: 1e3938e2-42d5-52f0-b580-faf29ea4fe59
page-type-slug: workstation-service
title: "Ttc client"
slug: ttc-client
domain-parent-slug: domain/eso
required-reading-slugs:
  - page-type/workstation-service
runs:
  - '/usr/bin/protontricks-launch --no-term "%h/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/AddOns/TamrielTradeCentre/Client/Client.exe"'
after:
  - graphical-session.target
part-of: graphical-session.target
wanted-by: graphical-session.target
enabled: true
restart: on-failure
restart-delay-seconds: 10
needs-secrets: false
---

# Definition

- **Ttc client** — the service that keeps the Tamriel Trade Centre price data current inside the game's Proton prefix.
