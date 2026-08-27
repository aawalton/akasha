---
id: 4882ff1b-6c93-52f1-bbb3-0a4b6a6f2446
page-type-slug: finding
title: "DB psql truncation notice lost"
domain-slug: domain/ops-cli
---

# Claim

`ops db psql` loses its "NOT A COMPLETE RESULT" truncation notice when the consumer closes the connection early, printing psql's own EAGAIN error in its place instead.

# Evidence

Project #18161 (status `someday_maybe`, `live-on: deploy`, domain `ops-cli`, tags `code-harness`, `author:claude`, owner `dalla`, created 2026-08-07, updated 2026-08-10). The row carried no capture text of its own beyond its title, which held the whole observation: "`ops db psql` loses its \"NOT A COMPLETE RESULT\" truncation notice when the consumer closes early, printing psql's own EAGAIN instead." Its retired `notes` attribute was empty on 2026-08-15, when this project file was written from the row.
