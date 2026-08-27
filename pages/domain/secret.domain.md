---
id: d2f0060b-254c-5cca-9e8a-32b641575da9
page-type-slug: domain
title: "Secret"
slug: secret
domain-parent-slug: domain/resource
settled: true
---

# Definition

- **Secret** — a value kept from everything that does not need it.

# Design

A secret is committed to the repository, encrypted, rather than held outside it.

Some secrets are generated inside the cluster and never committed, so nothing reading the repository can tell when one changes.

Only a secret's value is encrypted, so its name and shape are readable to anyone holding the repository.

A decrypted secret is piped to what needs it and never written to a file.

A secret on a workstation is read from `~/.secrets.env` rather than from the repository.
