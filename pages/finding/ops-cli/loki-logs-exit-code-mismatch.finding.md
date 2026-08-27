---
id: e10adaee-c42d-5604-87a0-36057b1106fe
slug: loki-logs-exit-code-mismatch
page-type-slug: finding
title: "Loki logs exit code mismatch"
domain-slug: domain/ops-cli
---

# Claim

`ops loki logs` exits 70 for a missing `PIPELINE_SA_TOKEN` or `K8S_API_BASE`, where its own test suite pins exit 1 for that case, and the command's help text agrees with the code's exit 70 rather than with the suite's pinned exit 1.

# Evidence

Project #18160 (status `someday_maybe`, `live-on: deploy`, domain `ops-cli`, tags `code-harness`, `author:claude`, owner `dalla`, created 2026-08-07, updated 2026-08-10). The row carried no capture text of its own beyond its title, which held the whole observation: "`ops loki logs` exits 70 where its own suite pins exit 1 for a missing PIPELINE_SA_TOKEN / K8S_API_BASE, and the help text sides with the code." Its retired `notes` attribute was empty on 2026-08-15, when this project file was written from the row.
